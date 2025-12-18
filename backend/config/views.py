# OpenAPI YAML（手書き/設計書ベース）を配信するためのビューです。
# Swagger UI / ReDoc から参照されます。
from pathlib import Path

from django.http import Http404, HttpResponse


BACKEND_DIR = Path(__file__).resolve().parent.parent
SCHEMA_PATH = BACKEND_DIR / "openapi.yaml"


def openapi_yaml_view(_request):
    """
    Serve the manually maintained OpenAPI YAML for Swagger UI/Redoc.
    """
    # ファイルが存在しない場合は 404 を返します。
    if not SCHEMA_PATH.exists():
        raise Http404("Schema file not found.")

    # YAML をそのまま返し、Content-Type を application/yaml にします。
    return HttpResponse(
        SCHEMA_PATH.read_text(encoding="utf-8"),
        content_type="application/yaml",
    )
