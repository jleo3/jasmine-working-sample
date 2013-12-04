$(document).ready(function(){

    function maakRij(table, x, y, type, rij){

        var tr = $('<tr>');

        if(type==='+'){
            tr.addClass('add');
        } else if(type==='-'){
            tr.addClass('del');
        }


        var td1 = $('<td>');
        var td2 = $('<td>');
        var td3 = $('<td>');

        td1.addClass('codekolom');
        td2.addClass('codekolom');
        td3.addClass('bredecode');

        td1.text(y);
        td2.text(x);
        td3.text(type + ' ' + rij);

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        table.append(tr);

    }

    function getDiff(table, matrix, a1, a2, x, y){
        if(x>0 && y>0 && a1[y-1]===a2[x-1]){
            getDiff(table, matrix, a1, a2, x-1, y-1);
            maakRij(table, x, y, ' ', a1[y-1]);
        } else {
            if(x>0 && (y===0 || matrix[y][x-1] >= matrix[y-1][x])){
                getDiff(table, matrix, a1, a2, x-1, y);
                maakRij(table, x, '', '+', a2[x-1]);
            } else if(y>0 && (x===0 || matrix[y][x-1] < matrix[y-1][x])){
                getDiff(table, matrix, a1, a2, x, y-1);
                maakRij(table, '', y, '-', a1[y-1], '');
            } else {
                return;
            }
        }

    }

    function diff(table, a1, a2){
        var matrix = new Array(a1.length+1);

        for(var y=0; y<matrix.length; y++){
            matrix[y] = new Array(a2.length+1);

            for(var x=0; x<matrix[y].length; x++){
                matrix[y][x] = 0;
            }
        }

        for(var y=1; y<matrix.length; y++){
            for(var x=1; x<matrix[y].length; x++){
                if(a1[y-1]===a2[x-1]){
                    matrix[y][x] = 1 + matrix[y-1][x-1];
                } else {
                    matrix[y][x] = Math.max(matrix[y-1][x], matrix[y][x-1]);
                }
            }
        }

        try {
            getDiff(table, matrix, a1, a2, x-1, y-1);
        } catch(e){
            alert(e);
        }
    }

    function getData(url){

        var result = '';

        $.ajax({
            dataType: 'text',
            async: false,
            url: url,
            success: function (data) {
                result = data;
            }
        });

        return result;

    }

    $('#btnDiff').click(function(){
        diff();
        return false;
    });

    function diffUrls(urlFrom, urlTo) {

        if (urlFrom == "" || urlTo == "")
            return;

        var from = getData(urlFrom);
        var to = getData(urlTo);

        var table = $('#diffTable');

        table.empty();

        diff(table, from.split('\n'), to.split('\n'));
    }

    $('#diffFrom').val(decodeURIComponent($.url().param('from') || ""));
    $('#diffTo').val(decodeURIComponent($.url().param('to') || ""));

    diffUrls($('#diffFrom').val(), $('#diffTo').val());


});

