module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    // Paramétrage

    src: {
      html: {
        index:'',
        partials:'partials',
        all :"**/*.html"
      },
      js:   ['js/**/*.js'],
      css: {
        all :'css/**/*.css',
        dir: 'css/',
        app: 'css/devfest.css'
      }
    },
    
    dest: {
      root:       'target',
      html: {
        index:    'target/index.html',
        partials: 'target/partials'
      },
      res:        'src/main/webapp/resources',
      js:         'target/javascript',
      css:        'target/css'
    },

    // Configuration des taches

    clean: {
      html:  ['<%= dest.html.index %>', '<%= dest.html.partials %>'],
      res:   ['<%= dest.res %>'],
      js:    ['<%= dest.js %>'],
      css:   ['<%= dest.css %>']
    },

    copy: {
      html: {
        files: [
          { expand: true, cwd: '<%= src.html %>', src: ['**'], dest: '<%= dest.root %>' }
        ]
      },
      res: {
        files: [
          { expand: true, cwd: '<%= src.res %>', src: ['**'], dest: '<%= dest.res %>' }
        ]
      }
    },

    /* Config auto des taches concat, uglify et cssmin */
    useminPrepare: {
      html: '<%= dest.html.index %>'
    },

    usemin: {
      html: ['<%= dest.html.index %>'],
      options: {
        dirs: ['<%= dest.root %>']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= src.js %>'],
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: '<%= src.css.app %>'
    },

    // Configuration du watch

    watch: {
      html: {
        files: ['<%= src.html.all %>'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['<%= src.css.all %>'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= src.js %>'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Chargement des plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Déclaration des taches
  grunt.registerTask('lint',    ['jshint', 'csslint']);
  grunt.registerTask('dist',    ['clean', 'copy:html', 'copy:res', 'compass', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
  grunt.registerTask('release', ['lint', 'dist']);
  grunt.registerTask('default', ['release']);

};
