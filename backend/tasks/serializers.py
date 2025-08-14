from rest_framework import serializers
from .models import Category, Task, ContextEntry


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True, allow_null=True, required=False
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "category",
            "category_id",
            "priority_score",
            "deadline",
            "status",
            "ai_enhanced_description",
            "estimated_duration",
            "created_at",
            "updated_at",
        ]


class ContextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntry
        fields = "__all__"
