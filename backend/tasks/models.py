from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=7, blank=True, null=True)
    usage_frequency = models.PositiveIntegerField(default=0)
    ai_suggested = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-usage_frequency", "name"]

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(
        Category, related_name="tasks", on_delete=models.SET_NULL, null=True, blank=True
    )
    priority_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    ai_enhanced_description = models.TextField(blank=True, null=True)
    estimated_duration = models.PositiveIntegerField(null=True, blank=True, help_text="Minutes")

    class Meta:
        ordering = ["-priority_score", "deadline"]

    def __str__(self):
        return self.title


class ContextEntry(models.Model):
    SOURCE_CHOICES = [
        ("whatsapp", "WhatsApp"),
        ("email", "Email"),
        ("notes", "Notes"),
    ]

    content = models.TextField()
    source_type = models.CharField(max_length=50, choices=SOURCE_CHOICES, blank=True, null=True)
    processed_insights = JSONField(blank=True, null=True)
    sentiment_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    keywords = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    relevance_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Context {self.id} - {self.source_type}"
