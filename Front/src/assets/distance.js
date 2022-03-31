$(document).ready(function(pixel) {
        var s = false; //evalúa los click's
        // COORDENADAS: puntos (iX,iY) y (fX,fY)
        var iX = 0; var iY = 0; var fX = 0; var fY = 0;
        
        $('#posicion_cursor').on({
            click:function(e){
                if (!s) { // ...evalúo primer click
                    iX=e.pageX;
                    iY=e.pageY;
                    s = true; // ¡primer click ejecutado!
                } else if(s) { // ...evalúo segundo click
                    fX=e.pageX;
                    fY=e.pageY;
                    s = false;// ¡segundo click ejecutado!
                    var d = pitagoras(iX,iY,fX,fY);//llamo a mi función que está más abajo
                    alert(d*pixel);//resultado - la distancia es:
                }
            }
        })
        function pitagoras(iX,iY,fX,fY){
            //un poco de algebra analítica para hallar la distancia no dirigida
            return r = Math.sqrt((Math.pow((iX-fX),2))+(Math.pow((iY-fY),2)));
        }
    });