//  20160402 NTS UI Development 1 Team JHS
//  Parameter를 전달하여 여러 상태의 산출물을 관리하는 경우 개발 전달을 위한 산출물 생성을 돕는 도구입니다.
//  Shell 환경에서 아래 명령어를 통해 산출물을 생성합니다.
//
//  get-html -f filename -p "parameter1, parameter2, ..."

//  의존성 도구 정의
var phantom         = require('phantom');
var fs              = require('fs');
var jquery          = require('jquery');
var Liftoff         = require('liftoff');
var argv            = require('minimist')(process.argv.slice(2));

//  옵션값 정의
var option_filename = argv.f || argv.file;
var option_param    = argv.p || argv.param;
var filename        = option_filename.split('.')[0];
var extension       = '.'+option_filename.split('.')[1];
var parameters      = option_param.split(',');
var temp_array      = [];
var path            = process.env.PWD;

var cli = new Liftoff({
    name: 'get-html'
});

//  파라미터 옵션값 정리
for ( var key in parameters ) {
    var value = parameters[key].trim();
    temp_array.push(value);
}
temp_array.unshift('default');
parameters = temp_array;

//  함수 정의
var get_html = function (param) {
    var filePath = path+'/dist_'+filename+'_'+param+extension;
    var sitepage = null;
    var phInstance = null;
    phantom.create()
        .then(function(instance){
            phInstance = instance;
            return instance.createPage();
        })
        .then(function (page) {
            sitepage = page;
            return page.open('file://'+path+'/'+filename+extension+'?'+param);
        })
        .then(function (status) {
            console.log(status);
            // 파일이 이미 존재하면 삭제
            fs.exists(filePath, function(exists){
                if ( exists ){
                    fs.unlinkSync(filePath);
                }
            });
            // 컨텐츠 정리
            sitepage.evaluate(function () {
                var uis = document.getElementsByClassName('markupScript');
                for ( var key in uis ) {
                    var ui = uis[key];
                    ui.innerText = "";
                }
            });
            return sitepage;
        })
        .then(function (sitepage) {
            return sitepage.property('content');
        })
        .then(function (content) {
            fs.writeFileSync(filePath, content);
            sitepage.close();
            phInstance.exit();
        })
        .catch(function (error) {
            console.log(error);
            phInstance.exit();
        });
};

//  실행
var run = function (env) {
    for ( var key in parameters ){
        var param = parameters[key];
        get_html(param);
    }
};

//  모듈 추출
module.exports = function () {
    cli.launch({}, run)
};