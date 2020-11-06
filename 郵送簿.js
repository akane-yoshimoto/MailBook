//在庫管理アプリと連携させるプログラム

(function(){

  "use strict";

/*新規レコード登録時連携*/
  kintone.events.on("app.record.create.submit.success", function(event){

      var record = event.record;

  if(record.radio.value == '入庫'){

    var body = {

      app: appID,
      id:record.レコードno.value

    };

    kintone.api(kintone.api.url('/k/v1/record', true), "GET", body).then(function(res){


      body.record = {

        "入庫" : {

          value: parseInt(res.record["入庫"].value,10) + parseInt(event.record["数量"].value,10)

        }
      };

       console.log(body.record.入庫.value);

      kintone.api(kintone.api.url('/k/v1/record', true), "PUT", body);

    
    });
  }else{

    var body = {

        app: appID,
        id:record.レコードno.value
  
      };
  
      kintone.api(kintone.api.url('/k/v1/record', true), "GET", body).then(function(res){
  
  
        body.record = {
  
          "出庫" : {
  
            value: parseInt(res.record["出庫"].value,10) + parseInt(event.record["数量"].value,10)
  
          }
        };
  
         console.log(body.record.出庫.value);
  
        kintone.api(kintone.api.url('/k/v1/record', true), "PUT", body);
  
      
      });

  }
    return event;

  });
  
  /*削除時連携*/
  kintone.events.on(["app.record.detail.delete.submit", "app.record.index.delete.submit"], function(event){
        var record = event.record;

        if(record.radio.value == '入庫'){
      
          var body = {
      
            app: appID,
            id:record.レコードno.value
      
          };
      
          kintone.api(kintone.api.url('/k/v1/record', true), "GET", body).then(function(res){
      
      
            body.record = {
      
              "入庫" : {
      
                value: parseInt(res.record["入庫"].value,10) - parseInt(event.record["数量"].value,10)
      
              }
            };
      
             console.log(body.record.入庫.value);
      
            kintone.api(kintone.api.url('/k/v1/record', true), "PUT", body);
      
          
          });
          
        }else{
      
          var body = {
      
              app: appID,
              id:record.レコードno.value
        
            };
        
            kintone.api(kintone.api.url('/k/v1/record', true), "GET", body).then(function(res){
        
        
              body.record = {
        
                "出庫" : {
        
                  value: parseInt(res.record["出庫"].value,10) - parseInt(event.record["数量"].value,10)
        
                }
              };
        
               console.log(body.record.出庫.value);
        
              kintone.api(kintone.api.url('/k/v1/record', true), "PUT", body);
        
            
            });
      
        }
          return event;
      
        });
})();
