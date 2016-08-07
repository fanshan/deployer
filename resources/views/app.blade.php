@include('js-localization::head')
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>{{ Lang::get('app.name') }}</title>

        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />

        <link rel="author" href="humans.txt" />

        <!-- Style -->
        <link href="{{ webpack('css/vendor.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ webpack('css/app.css') }}" rel="stylesheet" type="text/css" />

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="{{ webpack('js/ie.js') }}"></script>
        <![endif]-->
    </head>
    <body class="skin-{{ $theme }}">
        <script type="text/javascript">
            window.__PRELOADED_STATE__ = {
                deployer: {
                    locale: '{{ App::getLocale() }}',
                    user: {!! $logged_in_user->toJson() !!},
                    outdated: {{ $is_outdated ? 'true' : 'false' }},
                    latest: '{{ $current_version }}',
                    version: '{{ $latest_version }}',
                    token: '{{ Session::token() }}',
                },
                socket: {
                    server: '{{ config('deployer.socket_url') }}',
                    jwt: '{{ Session::get('jwt') }}'
                },
                navigation: {
                    running: {!! $deploying->toJson() !!},
                    pending: {!! $pending->toJson() !!},
                    projects: {!! $projects !!},
                    groups: {!! $groups !!}
                },
                dashboard: {
                    timeline: {!! $latest !!}
                }
            };
        </script>

        <div id="content"></div>

        <script src="{{ webpack('js/vendor.js') }}"></script>
        @yield('js-localization.head')
        <script src="{{ webpack('js/app.js') }}"></script>
    </body>
</html>