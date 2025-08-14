"""Context analysis utilities.
This module provides lightweight stubs that can later be hooked to OpenAI, Claude, Gemini, or a local LLM via LM Studio.
Actual AI calls are abstracted behind `_call_llm()` to keep surface area small.
"""

from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class ContextAnalyzer:
    """Analyze raw context (messages, emails, notes) into structured insights."""

    def analyze_daily_context(self, context_entries: List[str]) -> List[Dict[str, Any]]:
        """Perform sentiment, keyword extraction, urgency detection.
        Returns a list of dicts to be stored in `processed_insights`.
        """
        insights = []
        for entry in context_entries:
            # TODO: replace with real model call
            result = self._call_llm(
                f"Analyze the following context and extract sentiment, keywords, and urgency: {entry}"
            )
            insights.append(result)
        return insights

    def extract_task_hints(self, context: str) -> Dict[str, Any]:
        """Identify potential tasks and deadlines mentioned in the context string."""
        return self._call_llm(
            f"From the following text, list potential tasks, deadlines, and priority indicators: {context}"
        )

    # ---------------------------------------------------------------------
    # Internal helpers
    # ---------------------------------------------------------------------

    def _call_llm(self, prompt: str) -> Dict[str, Any]:
        """Placeholder for LLM API call. Returns a dummy response for now."""
        logger.debug("LLM prompt: %s", prompt)
        # In production, integrate OpenAI / LM Studio here.
        return {
            "sentiment_score": 0.0,
            "keywords": [],
            "urgent": False,
            "tasks": [],
        }
