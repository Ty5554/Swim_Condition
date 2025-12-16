from pathlib import Path

from django.http import Http404, HttpResponse


BACKEND_DIR = Path(__file__).resolve().parent.parent
SCHEMA_PATH = BACKEND_DIR / "openapi.yaml"


def openapi_yaml_view(_request):
    """
    Serve the manually maintained OpenAPI YAML for Swagger UI/Redoc.
    """
    if not SCHEMA_PATH.exists():
        raise Http404("Schema file not found.")

    return HttpResponse(
        SCHEMA_PATH.read_text(encoding="utf-8"),
        content_type="application/yaml",
    )
