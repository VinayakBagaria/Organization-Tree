from typing import Any, Optional


class ExceptionCreator(Exception):
    code: Optional[int]
    message: Any

    def __init__(self, *, code: Optional[int] = None, message: Optional[Any] = None):
        self.code = code
        self.message = message or None

    def __str__(self):
        return self.message or None
