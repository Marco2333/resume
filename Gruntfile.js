// 包装函数
module.exports = function(grunt) {

var sassStyle = 'compact';

// 任务配置,所有插件的配置信息
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
	sass: {
		dist: {
			options: {
			  	style: sassStyle,
			  	sourcemap: 'none'  //设置不要配套输出map文件
			},
			files: {
				'style/index.css': '_scss/style.scss'
			}
		}
	},

    // 插件名称： grunt-contrib-uglify
    // uglify插件的配置信息
    uglify: {
        build: {
          src: 'src/a.js',
          dest: 'build/a.min.js'
        }
    },
    // 插件名称： grunt-contrib-cssmin
    // cssmin插件的配置信息
    cssmin: {
    	options: {
    	    beautify: {
    	        //中文ascii化，非常有用！防止中文乱码的神配置
    	        ascii_only: true
    	    }
    	},
    	target: {
			files: [{
				expand: true,
				cwd: 'style/',
				src: ['*.css', '!*.min.css'],
				dest: 'style/',
				ext: '.min.css'
			}]
    	}
    },
    watch: {
		// scripts: {
		// 	files: ['./src/plugin.js','./src/plugin2.js'],
		// 	tasks: ['concat','jshint','uglify']
		// },
		sass: {
			files: ['./_scss/*.scss'],
			tasks: ['sass','cssmin']
		}
    }
});
   
       
  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('compresscss', ['cssmin']);
  grunt.registerTask('compilesass',['sass']);
  grunt.registerTask('watchit',['watch','sass','cssmin']);
};