(function($){

	$(function(){

		var _i = 0,
				_tab = $('.tablist');

		var _btnList = [];

		//ボタン
		//FIXME: もう少しよいやり方があるはず
		for(_i=0; _i<_tab.find('.tab-btn-item').length; _i++){
			_btnList.push(new TabListBtn('TABLIST_BTN_'+_i, _i, _tab.find('.tab-btn-item').eq(_i)));
		}

		//ボタン1の振る舞い
		_btnList[0].addModelEventListener = function(){
			var _o = _btnList[0];

			model.emitter.on('TABLIST_BTN_CLICK', function(){
				switch(model.btnIndex){
				case 0:
					//do nothing
					break;
				case 1:
					_o.jqObj.addClass('js-disable');
					break;
				case 2:
					_o.jqObj.removeClass('js-disable');
					break;
				}
			});
		};

		//ボタン2の振る舞い
		_btnList[1].addModelEventListener = function(){
			var _o = _btnList[1];

			model.emitter.on('TABLIST_BTN_CLICK', function(){
				switch(model.btnIndex){
				case 0:
					_o.jqObj.removeClass('js-disable');
					break;
				case 1:
					//do nothing
					break;
				case 2:
					_o.jqObj.addClass('js-disable');
					break;
				}
			});
		};

		_btnList[0].init();
		_btnList[1].init();
		_btnList[2].init();

		//パネル
		new TabListPanel('TABLIST_PANEL', $('.tab-panel'));
	});

	/*
	 * TabListModelクラス
	 */
	var TabListModel = (function(){

		//これがTabListModelのコンストラクタ
		function TabListModel(){
			this.init();
			this.emitter = $(this);
		}

		TabListModel.prototype = {
			constructor: TabListModel,
			btnIndex: 0,
			btnState: [],
			events: {
				TABLIST_BTN_CLICK: 'TABLIST_BTN_CLICK'
			},
			init: function(){

			},
			dispatch: function(eventName){
				this.emitter.trigger(this.events[eventName]);
			},
			onTabListBtnInit: function(index){
				this.btnState[index] = 1;
			},
			onTabListBtnClick: function(index){
				this.btnIndex = index;

				switch(this.btnIndex){
				case 0:
					this.btnState[1] = 1;
					break;
				case 1:
					this.btnState[0] = 0;
					break;
				case 2:
					this.btnState[0] = 1;
					this.btnState[1] = 0;
					break;
				}

				this.dispatch('TABLIST_BTN_CLICK');
			}
		}
		return TabListModel;
	})();

	/*
	 * TabListBtnクラス
	 */
	var TabListBtn = (function(){

		//これがTabListBtnのコンストラクタ
		function TabListBtn(id, index, jqObj){
			this.id = id;
			this.jqObj = jqObj;
			this.index = index;
		}

		TabListBtn.prototype = {
			constructor: TabListBtn,
			index: 0,
			debugmode: false,
			elog: function(eventName){
				if(this.debugmode) console.log(this.id + '::' + eventName);
			},
			init: function(){
				this.addUserEventlistener();
				this.addModelEventListener();
				model.onTabListBtnInit(this.index);
			},
			addUserEventlistener: function(){
				//ここにこのView自身のイベントのリスナーを追加
				var _o = this;

				this.jqObj.on('click', function(){
					if(model.btnState[_o.index] === 1){
						model.onTabListBtnClick(_o.index);
					}
				});
			},
			addModelEventListener: function(){
				//ここにModelから発信されたイベントのリスナーを追加
				var _o = this;

				model.emitter.on('TABLIST_BTN_CLICK', function(){
					//do nothing
				});
			}
		}
		return TabListBtn;
	})();

	/*
	 * TabListPanelクラス
	 */
	var TabListPanel = (function(){

		//これがTabListPanelのコンストラクタ
		function TabListPanel(id, jqObj){
			this.id = id;
			this.init(jqObj);
		}

		TabListPanel.prototype = {
			constructor: TabListPanel,
			debugmode: false,
			elog: function(eventName){
				if(this.debugmode) console.log(this.id + '::' + eventName);
			},
			init: function(jqObj){
				this.jqObj = jqObj;
				this.addUserEventlistener();
				this.addModelEventListener();
			},
			addUserEventlistener: function(){
				//ここにこのView自身のイベントのリスナーを追加
				var _o = this;
			},
			addModelEventListener: function(){
				//ここにModelから発信されたイベントのリスナーを追加	
				var _o = this;

				model.emitter.on('TABLIST_BTN_CLICK', function(){
					_o.elog('TABLIST_BTN_CLICK');

					switch(model.btnIndex){
					case 0:
						_o.jqObj.css('background-color', 'blue');
						break;
					case 1:
						_o.jqObj.css('background-color', 'red');
						break;
					case 2:
						//do nothing
						break; 
					}
				});
			}
		}
		return TabListPanel;
	})();

	var model = new TabListModel();
})(jQuery);