"""Localized TTS message templates for chore announcements."""
from __future__ import annotations

TTS_MESSAGES: dict[str, dict[str, str]] = {
    "en": {
        "chore_trigger": "{name}, it's time to {chore}",
        "chore_trigger_unassigned": "It's time to {chore}",
        "chore_reminder": "Reminder: {chore} still needs to be done",
        "chore_reminder_assigned": "Reminder: {name}, {chore} still needs to be done",
    },
    "sv": {
        "chore_trigger": "{name}, det \u00e4r dags f\u00f6r {chore}",
        "chore_trigger_unassigned": "Det \u00e4r dags f\u00f6r {chore}",
        "chore_reminder": "P\u00e5minnelse: {chore} beh\u00f6ver fortfarande g\u00f6ras",
        "chore_reminder_assigned": "P\u00e5minnelse: {name}, {chore} beh\u00f6ver fortfarande g\u00f6ras",
    },
}


SUPPORTED_LANGUAGES = list(TTS_MESSAGES.keys())


def get_tts_message(language: str, key: str, **kwargs: str) -> str:
    """Get a localized TTS message."""
    lang_msgs = TTS_MESSAGES.get(language, TTS_MESSAGES["en"])
    template = lang_msgs.get(key, TTS_MESSAGES["en"].get(key, ""))
    return template.format(**kwargs)
