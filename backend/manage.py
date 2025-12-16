#!/usr/bin/env python
# Django の管理コマンド（runserver / migrate / createsuperuser 等）を実行するためのエントリポイントです。
import os
import sys

def main():
    # 実行時に参照する settings モジュールを環境変数で指定します。
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        # `django-admin` 相当のコマンド実行関数を読み込みます。
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Django が import できない場合は、仮想環境未有効や依存未インストールの可能性があります。
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # コマンドライン引数（sys.argv）に基づいて管理コマンドを実行します。
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    # `python manage.py ...` で起動されたときだけ main() を実行します。
    main()
