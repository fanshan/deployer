<?php

if (!function_exists('webpack')) {
    /**
     * If running in the webpack environment prefixes all assets with the webpack server host
     * otherwise just returns the elixir path
     *
     * @param  string  $file
     * @param  string  $buildDirectory
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    function webpack($file, $buildDirectory = 'build')
    {
        $path = elixir($file, $buildDirectory);

        if (!env('WEBPACK_ENABLED', false)) {
            return $path;
        }

        $host = env('APP_URL');
        $port = env('WEBPACK_PORT', 8080);

        return $host . ':' . $port . $path;
    }
}
