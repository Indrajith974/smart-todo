from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Category, Task, ContextEntry
from .serializers import CategorySerializer, TaskSerializer, ContextEntrySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by category
        category_filter = self.request.query_params.get('category', None)
        if category_filter:
            queryset = queryset.filter(category_id=category_filter)
        
        # Search in title and description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        return queryset.order_by('-priority_score', 'deadline')

    @action(detail=False, methods=['get'])
    def priorities(self, request):
        """Get AI-prioritized task list"""
        tasks = self.get_queryset().filter(status__in=['pending', 'in_progress'])
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def export(self, request):
        """Export all tasks as JSON list"""
        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def import_tasks(self, request):
        """Import tasks from JSON list"""
        tasks_data = request.data if isinstance(request.data, list) else request.data.get('tasks', [])
        created = 0
        for item in tasks_data:
            ser = self.get_serializer(data=item)
            if ser.is_valid():
                ser.save()
                created += 1
        return Response({'created': created}, status=status.HTTP_201_CREATED)

    def bulk_prioritize(self, request):
        """Bulk update task priorities"""
        task_priorities = request.data.get('task_priorities', [])
        
        for item in task_priorities:
            task_id = item.get('task_id')
            priority_score = item.get('priority_score')
            
            if task_id and priority_score is not None:
                Task.objects.filter(id=task_id).update(priority_score=priority_score)
        
        return Response({'message': 'Priorities updated successfully'})


class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all()
    serializer_class = ContextEntrySerializer

    def get_queryset(self):
        queryset = ContextEntry.objects.all()
        
        # Filter by source type
        source_type = self.request.query_params.get('source_type', None)
        if source_type:
            queryset = queryset.filter(source_type=source_type)
        
        return queryset.order_by('-created_at')
