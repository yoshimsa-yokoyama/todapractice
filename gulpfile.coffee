#npm packages
gulp = require 'gulp'
connect = require 'gulp-connect'

gulp.task 'copy', ->
	gulp.src './dev/**/*'
		.pipe gulp.dest './pre/'

gulp.task 'server', ->
	connect.server
		root: './dev/'
		livereload: true

gulp.task 'reload', ['copy'], ->
	gulp.src './pre/**/*.{html,css,js}'
		.pipe connect.reload()

gulp.task 'watch', ->
	gulp.watch ['./dev/**/*.{html,css,js}'], ['copy','reload']

#default
gulp.task 'default', ['copy','server','watch']