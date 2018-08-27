<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitff26d7adb1918ad788d621f42629d63d
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Peru\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Peru\\' => 
        array (
            0 => __DIR__ . '/..' . '/giansalex/peru-consult/src/Peru',
        ),
    );

    public static $classMap = array (
        'SimpleMail' => __DIR__ . '/..' . '/eoghanobrien/php-simple-mail/class.simple_mail.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitff26d7adb1918ad788d621f42629d63d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitff26d7adb1918ad788d621f42629d63d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitff26d7adb1918ad788d621f42629d63d::$classMap;

        }, null, ClassLoader::class);
    }
}
