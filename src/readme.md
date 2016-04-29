get-html
-------------

# get-html

## install
	
	npm install -g get-html

## use 

    get-html -f 파일명 -p "파라미터, 파라미터2 ..."

## dist

	> get-html -f index.html -p "foo, bar"
	
	dist_index_foo.html
	dist_index_bar.html


## description

`03_account_settings_product.html` 등 관리해야하는 산출물이 너무 많이 생성되는 경우를 방지하고자 JavaScript를 통해 Parameter를 받아서 상태변화를 보여주도록 제작된 페이지들이 있다. 개발 전달, 혹은 유지보수를 위해 파라미터 없이도 완성된 산출물을 뽑아주는 Node.js 함수를 제작해 두었다.

1. 위 명령어를 통해 생성된 파일들은 `dist_`라는 전치사를 가진채 명령어를 실행한 곳에서 생성된다.
2. 파일 내 파라미터를 통해 내용을 분기하는 스크립트의 경우 산출물에서 두 번 실행되면 오류가 생기므로 삭제하여야 한다. 해당 `script` 요소에 `class="markupScript"` 속성을 추가해 준다.