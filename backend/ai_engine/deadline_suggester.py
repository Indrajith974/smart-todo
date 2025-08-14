"""Deadline suggestion utilities."""
from datetime import date, timedelta
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)


class DeadlineSuggester:
    """Suggest realistic deadlines for tasks based on context & workload."""

    def suggest_realistic_deadline(self, task: Dict[str, Any], current_workload: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Return a dict with `suggested_deadline` and `confidence` (0-1)."""
        # Simple heuristic: today + 3 days if none provided
        base_date = date.today() + timedelta(days=3)
        confidence = 0.5
        if task.get("deadline"):
            base_date = task["deadline"]
            confidence = 0.8
        return {
            "suggested_deadline": base_date.isoformat(),
            "confidence": confidence,
        }
