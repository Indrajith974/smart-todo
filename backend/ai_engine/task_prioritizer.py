"""Task prioritization utilities."""
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class TaskPrioritizer:
    """Calculate AI-driven priority scores for tasks."""

    def calculate_priority_score(self, task: Dict[str, Any], context_data: Dict[str, Any], user_preferences: Dict[str, Any] | None = None) -> float:
        """Return a float between 0 and 1 indicating priority."""
        # TODO: replace heuristic with real LLM / ML logic
        score = 0.5
        if task.get("deadline"):
            score += 0.2
        if context_data.get("urgent"):
            score += 0.2
        return min(score, 1.0)

    def get_priority_recommendations(self, tasks: List[Dict[str, Any]], context: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Return tasks with computed scores sorted descending."""
        with_scores = []
        for task in tasks:
            score = self.calculate_priority_score(task, context, None)
            with_scores.append({**task, "priority_score": score})
        return sorted(with_scores, key=lambda x: x["priority_score"], reverse=True)
