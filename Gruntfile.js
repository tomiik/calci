module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'styles/src/style.css': 'styles/src/style.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['styles/src/*.scss'],
        tasks: ['sass', 'cssmin']
      }
    },
    cssmin: {
      target: {
        files: {
          'styles/app.min.css':
          [
            'styles/src/bootstrap.css',
            'styles/src/style.css'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['sass', 'cssmin','watch']);
}
