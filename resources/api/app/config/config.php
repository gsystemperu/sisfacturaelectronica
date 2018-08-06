<?php

defined('APP_PATH') || define('APP_PATH', realpath('.'));

return new \Phalcon\Config(array(
    'database' => array(
        'adapter'     => 'PostgreSQL',
        'host'        => '127.0.0.1',
        'username'    => 'postgres',
        'password'    => '64y4.634##',
        'dbname'      => 'dbbotica_ss',
        'schema'      => 'public',
	    'port'          => 5432
    ),
    'application' => array(
        'controllersDir' => APP_PATH . '/app/controllers/',
        'modelsDir'      => APP_PATH . '/app/models/',
        'migrationsDir'  => APP_PATH . '/app/migrations/',
        'viewsDir'       => APP_PATH . '/app/views/',
        'pluginsDir'     => APP_PATH . '/app/plugins/',
        'libraryDir'     => APP_PATH . '/app/library/',
        'cacheDir'       => APP_PATH . '/app/cache/',
        'helpersDir'     => APP_PATH . '/app/helpers/',
        'baseUri'        => '/api/', 
        'vendor'         => APP_PATH . '/vendor/'
    )
));
