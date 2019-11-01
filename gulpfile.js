const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

sass.compiler = require('node-sass');

const scss = () => {
    return src('./sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(dest('./css'));
};

const minify = () => {
    return src('css/main.css')
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(dest('./css'));
};

exports.default = () => {
    watch('./sass/**/*.scss', series(scss, minify));
}