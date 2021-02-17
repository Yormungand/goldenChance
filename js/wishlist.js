Wishlist = {
    target: 'wishlistTarget',
    init: function(config){
        if(config!==undefined){
            if(config.target!==undefined) this.target=config.target;
            if(config.addProductForm!==undefined) this.addProductForm.init(config.addProductForm);
        }
    },
    addProductForm: {
        target: 'addProductFormTarget',
        wishlistTarget: 'wishlistTarget',
        init: function(config){
            if(config!==undefined){
                if(config.target!==undefined) this.target=config.target;
            }
        },
        list: function(){
            var _this = this;
            Wishlist._get('/wishlist/list', null, function(data){
                $('#'+_this.wishlistTarget).html(data);
            });
        },
        showForm: function(productId, count){
            var _this = this;
            Wishlist._get('/wishlist/createWithList', 'productId='+productId+'&count='+count, function(data){
                $('#'+_this.target).html(data).show();
            });
        },
        hide: function(){
            $('#'+this.target).hide();
        },
        addProduct: function(basketId, productId, count, callback){
            var _this = this;
            Wishlist._post('/basket/add', "basketId="+basketId+"&productId="+productId+"&count="+count, function(data){
                _this.hide();
                if(callback!==undefined) callback(data);
            });
        },
        createWishList: function(callback){
            var _this = this;
            Wishlist._post('/api/basket/create.json', 'alias='+ $('#wishlistName').val(), function(data){
                _this.list();
                if(callback!==undefined) callback(data);
            });
        }
    },
    list: function(){
        var _this = this;
        this._get('/wishlist/listWithItems', null, function(data){
            $('#'+_this.target).html(data);
        });
    },
    items: function(basketId){
        var _this = this;
        this._get('/wishlist/items', 'id='+basketId, function(data){
            $('#'+_this.target).html(data);
        });
    },
    showCreateForm: function(){
        var _this = this;
        this._get('/wishlist/create', null, function(data){
            $('#'+_this.target).html(data).show();
        });
    },
    create: function(callback){
        var _this = this;
        this._post('/api/basket/create.json', 'alias='+ $('#wishlistName').val(), function(data){
            _this.list();
            if(callback!==undefined) callback(data);
        });
    },
    remove: function(basketId){
        var _this = this;
        this._post('/wishlist/delete', 'id='+basketId, function(data){
            _this.list();
            if(callback!==undefined) callback(data);
        });
    },
    empty: function(basketId, callback){
        var _this = this;
        this._post('/basket/empty.json', 'basketId='+basketId, function(data){
            _this.list();
            if(callback!==undefined) callback(data);
        });
    },
    removeProduct: function(basketId, productId, callback){
        var _this = this;
        this._post('/wishlist/removeItem', 'basketId='+basketId+'&productId='+productId, function(data){
            _this.list();
            if(callback!==undefined) callback(data);
        });
    },
    addToBasket: function(basketId, callback){
        this._post('/wishlist/addToBasket.json', 'basketId='+basketId, function(data){
            if(callback!==undefined) callback(data);
        });
    },
    _get: function(url, params, callback){
        $.get(url, params, function(data){
            if(callback!==undefined) callback(data);
        }).fail(function(xhr){
            if(xhr.status===401){
                window.location.href = '/signin';
            }
        });
    },
    _post: function(url, params, callback){
        $.post(url, params, function(data){
            if(callback!==undefined) callback(data);
        }).fail(function(xhr){
            if(xhr.status===401){
                window.location.href = '/signin';
            }
        });
    }
};