'use strict';

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var config = {};

  grunt.initConfig(config);

  var testTasks = [];
  var buildTasks = [];

  grunt.registerTask('test', testTasks);
  grunt.registerTask('build', buildTasks);
};
