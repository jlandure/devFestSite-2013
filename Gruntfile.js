module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    // Paramétrage

    src: {
      html: {
        index:    'index.html',
        partials: 'partials',
        all :     "**/*.html"
      },
      js:   ['js/**/*.js'],
      css: {
        all :'css/**/*.css',
        dir: 'css/',
        app: 'css/devfest.css'
      },
      assets: {
        font:     'font',
        images:   'images',
        json:     'json',
        manifest: 'devfest_appcache.manifest'
      }
    },
    
    dest: {
      root:       'prod',
      html: {
        index:    'prod/index.html',
        partials: 'prod/partials'
      },
      assets: {
        font:     'prod/font',
        images:   'prod/images',
        json:     'prod/json',
        manifest: 'prod/devfest_appcache.manifest'
      }
    },

    // Configuration des taches

    clean: {
      prod:   '<%= dest.root %>'
    },

    copy: {
      html: {
        files: [
          { src: '<%= src.html.index %>', dest: '<%= dest.html.index %>' },
          { expand: true, cwd: '<%= src.html.partials %>', src: ['**/*.html'], dest: '<%= dest.html.partials %>' }
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: '<%= src.assets.font %>', src: ['**'], dest: '<%= dest.assets.font %>' },
          { expand: true, cwd: '<%= src.assets.images %>', src: ['**'], dest: '<%= dest.assets.images %>' },
          { expand: true, cwd: '<%= src.assets.json %>', src: ['**/*.json'], dest: '<%= dest.assets.json %>' },
          { src: '<%= src.assets.manifest %>', dest: '<%= dest.assets.manifest %>' }
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
/*
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
    },*/

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
  /*grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');*/
  grunt.loadNpmTasks('grunt-contrib-watch');
  /*grunt.loadNpmTasks('grunt-contrib-compass');**/

  // Déclaration des taches
  /*grunt.registerTask('lint',    ['jshint', 'csslint']);*/
  grunt.registerTask('prod',    ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
  grunt.registerTask('default', ['prod']);

};
