/**********************************
************Bookmark Controller********
**********************************/
var bookmarkController = (function(){
    function Recipe(id, name, Url){
        this.id=id;
        this.name=name;
        this.Url=Url;
    };
    var recipeStorage = {
        setRecipeCollection: function(newRecipe){
            localStorage.setItem('recipeCollection', JSON.stringify(newRecipe));
        },
        getRecipeCollection: function (){
        return JSON.parse(localStorage.getItem('recipeCollection'));
        },
        removeRecipeCollection: function(){
            localStorage.removeItem('recipeCollection');
        }
    };
    
     if(recipeStorage.getRecipeCollection()===null){
                recipeStorage.setRecipeCollection([]);
            };
    
    return {
            getRecipeStorage: recipeStorage,
            addRecipeLocalStorage: function(reName, reUrl){
               var recipeId, recipeName, recipeUrl, getRecipeStor, collectionLength
            //recipeArr=[];
               //if(recipeStorage.getRecipeCollection()!==null){
               collectionLength=recipeStorage.getRecipeCollection().length
            if (collectionLength===0){
                recipeId=0;
            } else {recipeId=collectionLength}
               // recipeId=0;
            recipeName=reName;
            recipeUrl=reUrl;
                //console.log('hi');
            var newRecipe= new Recipe(recipeId, recipeName, recipeUrl);
            
            getRecipeStor = recipeStorage.getRecipeCollection();
            getRecipeStor.push(newRecipe);
            recipeStorage.setRecipeCollection(getRecipeStor);
               //    }
            
        },
         deleteBookmark: function(matchUrl){
             //console.log(matchUrl);
           var newCollection
            for(var x=0; x<recipeStorage.getRecipeCollection().length; x++){
                //console.log(recipeStorage.getRecipeCollection()[1]);
                if(recipeStorage.getRecipeCollection()[x].Url.indexOf(matchUrl)>=0){
                    newCollection=recipeStorage.getRecipeCollection();
                    newCollection.splice(x,1);
                    recipeStorage.setRecipeCollection(newCollection)
                }
        };
        bookmarkController.displayRecipe(bookmarkController.getRecipeStorage.getRecipeCollection());
    },
        displayRecipe: function(storage){
            //console.log(storage);
            document.getElementById('bookmarkresults').innerHTML='';
            var resultHtml
            for (var i=0; i<=storage.length; i++){
                if(storage[i] !==undefined){
                   document.getElementById('bookmarkresults').innerHTML +='<div class="well">'+
                       '<h3>'+storage[i].name+
                       ' <a class="btn btn-default" target="_blank" href="'+storage[i].Url+'">Visit</a> '+
                       ' <a onclick="bookmarkController.deleteBookmark(\''+storage[i].Url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                       '</h3>'+
                       '</div>';
                    //resultHtml='<p><span>1. Question Text</span><button id="question-1">Delete</button></p>'
                    //resultHtml='<div class="col-lg-12"><div id="bookmarkresults'+ i +'"></div>'+ storage[i].name +'</div>';
                    //document.querySelector('.row.marketing').insertAdjacentHTML('afterbegin',resultHtml); 
                }
              
            }
            
        
        }
       
    }
    
})();

/**********************************
************UI Controller********
**********************************/

var UIController = (function(){
    
    var domItems={
        recipeName:document.getElementById('recipename'),
        recipeUrl:document.getElementById('recipeURL'),
        submitBtn:document.querySelector('.btn.btn-primary')
    }
    return{ 
        getDomItems: domItems,
        
   
    }
        
        
})();

/**********************************
************Controller********
**********************************/

var Controller = (function(bmCtrl, UICtrl){
    bmCtrl.displayRecipe(bmCtrl.getRecipeStorage.getRecipeCollection());
    UICtrl.getDomItems.submitBtn.addEventListener('click', function(){
        event.preventDefault();
        
     bmCtrl.addRecipeLocalStorage(UICtrl.getDomItems.recipeName.value, UICtrl.getDomItems.recipeUrl.value);
      bmCtrl.displayRecipe(bmCtrl.getRecipeStorage.getRecipeCollection())  
    })
    
    
    
})(bookmarkController, UIController);


    