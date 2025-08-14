"""Task enhancement utilities."""
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)


class TaskEnhancer:
    """Enhance task descriptions, suggest categories & subtasks."""

    def enhance_task_description(self, task: Dict[str, Any], relevant_context: List[str]) -> Dict[str, Any]:
        """Return an improved description and possible subtasks."""
        improved = task.get("description", "") + " (enhanced)"
        subtasks = []  # TODO: generate via LLM
        logger.debug("Enhanced task %s", task.get("title"))
        return {
            "ai_enhanced_description": improved,
            "subtasks": subtasks,
        }

    def suggest_categories(self, task_description: str) -> List[str]:
        """Return list of suggested categories/tags."""
        # Very naive placeholder
        if "meeting" in task_description.lower():
            return ["work", "meetings"]
        return ["general"]
