
// LOCAL STORAGE
const STORAGE = 'STORAGE';
// Todo save data to storage 
function save( datas ) {
  if (isStorageExist()) {
    const parsed = JSON.stringify(datas);
    localStorage.setItem(STORAGE, parsed);
  }
}
// Todo tambah data ke storage
function insert( name=null, data=null, callback=null ) {
  let datas = result();

  if (name !== null) {
    datas[name] = data;
  }else {
    datas = data;
  }
  save( datas );

  if (callback!==null) {
    callback();
  }
};
// Todo result data from storage
function result( name=null ) {
  const serializedData = localStorage.getItem(STORAGE);
  const datas = JSON.parse(serializedData);
  
  if (datas !== null) {
    if (name !== null) {
      if (name in datas) {
        return datas[name];
      }else {
        return null;
      }
    }else {
      return datas;
    }
  }else {
    return {};
  }
};
// todo check localstorage
function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}





let _income = {
    total: 0,
    list: {
        emp: 0,
        sav: 0,
        pen: 0,
        ben: 0,
        gif: 0,
        oth: 0,
    }
};
let _expenses = {
    total: 0,
    list: {
        hou: {
            ren: 0,
            gro: 0,
            fue: 0,
            hom: 0,
            oth: 0
        },
        tra: {
            ren: 0,
            gro: 0,
            fue: 0,
            hom: 0,
            oth: 0
        },
        foo: {
            ren: 0,
            gro: 0,
            fue: 0,
            hom: 0,
            oth: 0
        },
        hea: {
            ren: 0,
            gro: 0,
            fue: 0,
            hom: 0,
            oth: 0
        },
        mis: {
            ren: 0,
            gro: 0,
            fue: 0,
            hom: 0,
            oth: 0
        },
        oth: {}
    }
};



// number format
function formatNumber( val ) {
    return new Intl.NumberFormat().format(val);
}
function reverseFormatNumber( val ){
    var group = new Intl.NumberFormat().format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat().format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}






// INCOME

__listing_income();

// calculate income total
function __income()
{
    // set emp, sav, pen, ben, gif, oth
    let emp = parseFloat( reverseFormatNumber( $("#income-calculate #inc-emp").html() ) );
    let sav = parseFloat( reverseFormatNumber( $("#income-calculate #inc-sav").html() ) );
    let pen = parseFloat( reverseFormatNumber( $("#income-calculate #inc-pen").html() ) );
    let ben = parseFloat( reverseFormatNumber( $("#income-calculate #inc-ben").html() ) );
    let gif = parseFloat( reverseFormatNumber( $("#income-calculate #inc-gif").html() ) );
    let oth = parseFloat( reverseFormatNumber( $("#income-calculate #inc-oth").html() ) );
    // set total
    let total = emp + sav + pen + ben + gif + oth;
    // output to html
    $("#income-calculate #inc-tot").html( formatNumber( total.toFixed(0) ) );
    // save to storage
    _income = {
        total: total,
        list: {
            emp: emp,
            sav: sav,
            pen: pen,
            ben: ben,
            gif: gif,
            oth: oth,
        }
    };
    insert('income', _income);
}

// calculate income details
function __income_details( name )
{
    // setup ipt, drp, inc
    let ipt = $("#income-calculate #"+name+"");
    let drp = $("#income-calculate #drp-"+name+"");
    let inc = $("#income-calculate #inc-"+name+"");
    // parse value
    ipt = ( ipt.val() !== '') ? parseFloat(ipt.val()) : 0;
    drp = drp.val();
    // set total
    let total=0;
    // check for drp
    if (drp === 'week') {
        total = ipt * 4;
    }else if (drp == 'month') {
        total = ipt;
    }else {
        total = ipt / 12;
    }
    // output to html
    inc.html( formatNumber( total.toFixed(0) ) );
    // calculate income total
    __income();
}

// listing all input income
function __listing_income()
{
    // emp
    $("#income-calculate #emp").on("change", function() {
        __income_details('emp');
    });
    $("#income-calculate #drp-emp").on("change", function() {
        __income_details('emp');
    });
    // sav
    $("#income-calculate #sav").on("change", function() {
        __income_details('sav');
    });
    $("#income-calculate #drp-sav").on("change", function() {
        __income_details('sav');
    });
    // pen
    $("#income-calculate #pen").on("change", function() {
        __income_details('pen');
    });
    $("#income-calculate #drp-pen").on("change", function() {
        __income_details('pen');
    });
    // ben
    $("#income-calculate #ben").on("change", function() {
        __income_details('ben');
    });
    $("#income-calculate #drp-ben").on("change", function() {
        __income_details('ben');
    });
    // gif
    $("#income-calculate #gif").on("change", function() {
        __income_details('gif');
    });
    $("#income-calculate #drp-gif").on("change", function() {
        __income_details('gif');
    });
    // oth
    $("#income-calculate #oth").on("change", function() {
        __income_details('oth');
    });
    $("#income-calculate #drp-oth").on("change", function() {
        __income_details('oth');
    });
}

// hidden gif, oth
$("#income-calculate #gif-div").hide();
$("#income-calculate #oth-div").hide();

// listening checkbox change
$(".login-modal2_component #wf-form-Log-in-Form-2 input[type=checkbox]").each( function() {
    $(this).on("change", function() {
        let name = $(this).val();
        if ( $(this).is(":checked") ) {
            $("#income-calculate #"+name+"-div").show();
        }else {
            $("#income-calculate #"+name+"-div").hide();
            $("#income-calculate #"+name).val('');
        }
        __income_details( name );
        __income_checked_box()
    });
});

// change text add more to edit if checkbox is checked 6
function __income_checked_box()
{
    let checked=0;
    $(".login-modal2_component #wf-form-Log-in-Form-2 input[type=checkbox]").each( function() {
        if ($(this).is(":checked")) {
            checked += 1;
        }
    });
    if (checked == 6) {
        $("#income-calculate #inc-adm>div").html("Edit More");
    }else {
        $("#income-calculate #inc-adm>div").html("Add More");
    }
}


















// EXPENSES

__listing_expenses();
__add_more_expenses();

// calculate expenses total
function __expenses()
{
    let total = 0;
    // each all inc-collect
    $("#expenses-calculate .inc-collect").each( function() {
        total += parseFloat( $(this).val() );
    });
    // output to html
    $("#expenses-calculate #exp-tot").html( formatNumber( total.toFixed(0) ) );
    _expenses.total = total;
    insert('expenses', _expenses);
}

// calculate expenses details
function __expenses_details( name )
{
    // setup inc and total
    let total_all = 0;
    let total = 0;
    let inc = $("#expenses-calculate #exp-"+name+"-div #exp-"+name+"");
    let inc_collect = $("#expenses-calculate #exp-"+name+"-div .inc-collect");
    // each all input
    $("#expenses-calculate #exp-"+name+"-div .form-accordion-details input[id]").each( function() {
        // setup ipt, drp
        total=0;
        let ipt = $(this);
        let drp = $("#expenses-calculate #exp-"+name+"-div #drp-"+ipt.attr('id'));
        let store_name = ipt.attr('id');
        // parse value
        ipt = ( ipt.val() !== '') ? parseFloat(ipt.val()) : 0;
        drp = drp.val();
        // check for drp
        if (drp === 'week') {
            total += ipt * 4;
        }else if (drp == 'month') {
            total += ipt;
        }else {
            total += ipt / 12;
        }
        // check
        if ( (store_name=='ren') || (store_name=='gro') || (store_name=='fue') || (store_name=='hom') ) {
            _expenses.list[name][store_name] = total;
        }else {
            _expenses.list[name]['oth'] = total;
        }
        total_all+=total;
    });
    // output to html
    inc.html( formatNumber( total_all.toFixed(0) ) );
    inc_collect.val( total_all.toFixed(0) );
    __expenses();
    insert('expenses', _expenses);
}

// calculate income details
function __expenses_details_oth( name )
{
    // set length
    let oth_length = $("#expenses-calculate #exp-"+name+"-div .form-accordion-details>div>.wrapping-oth input[id]").length;
    // set html
    let oth = '<div class="form-content-inside-wrapper inside"><div class="margin-bottom margin-tiny"><input type="text" class="text-field-6 input-text w-input" maxlength="256" name="employment" data-name="employment" placeholder="Custom Subcategory"></div><div class="w-layout-grid grid-23"><input type="text"class="text-field-6 w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a94-64b2bd7d w-input"maxlength="256" name="employment" data-name="employment" placeholder="$0" id="oth-'+oth_length+'"><select id="drp-oth-'+oth_length+'" name="field" data-name="Field"class="select-field-4 w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a95-64b2bd7d w-select"><option value="week">Per week</option><option value="month">Per month</option><option value="year">Per year</option></select></div>';
    // inject oth to html
    if (oth_length <= 2) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details>div>.wrapping-oth").append(oth);
    }
    if (oth_length >= 2) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details #exp-adm>div").html("Edit More Subcategory");
    }
    console.log(oth_length);
    // listen hou
    __listing_expenses();
}

// listing all input expenses
function __listing_expenses()
{
    // hou
    $("#expenses-calculate #exp-hou-div input[id]").on("change", function() {
        __expenses_details( "hou" );
    });
    $("#expenses-calculate #exp-hou-div select").on("change", function() {
        __expenses_details( "hou" );
    });
    // tra
    $("#expenses-calculate #exp-tra-div input[id]").on("change", function() {
        __expenses_details( "tra" );
    });
    $("#expenses-calculate #exp-tra-div select").on("change", function() {
        __expenses_details( "tra" );
    });
    // foo
    $("#expenses-calculate #exp-foo-div input[id]").on("change", function() {
        __expenses_details( "foo" );
    });
    $("#expenses-calculate #exp-foo-div select").on("change", function() {
        __expenses_details( "foo" );
    });
    // hea
    $("#expenses-calculate #exp-hea-div input[id]").on("change", function() {
        __expenses_details( "hea" );
    });
    $("#expenses-calculate #exp-hea-div select").on("change", function() {
        __expenses_details( "hea" );
    });
    // mis
    $("#expenses-calculate #exp-mis-div input[id]").on("change", function() {
        __expenses_details( "mis" );
    });
    $("#expenses-calculate #exp-mis-div select").on("change", function() {
        __expenses_details( "mis" );
    });
    // oth
    $("#expenses-calculate #exp-oth-div input[id]").on("change", function() {
        __expenses_details( "oth" );
    });
    $("#expenses-calculate #exp-oth-div select").on("change", function() {
        __expenses_details( "oth" );
    });
}

// listing add more change
function __add_more_expenses()
{
    // hou
    $("#expenses-calculate #exp-adm-hou").on("click", function() {
        __expenses_details_oth( "hou" );
    });
    // tra
    $("#expenses-calculate #exp-adm-tra").on("click", function() {
        __expenses_details_oth( "tra" );
    });
    // foo
    $("#expenses-calculate #exp-adm-foo").on("click", function() {
        __expenses_details_oth( "foo" );
    });
    // hea
    $("#expenses-calculate #exp-adm-hea").on("click", function() {
        __expenses_details_oth( "hea" );
    });
    // mis
    $("#expenses-calculate #exp-adm-mis").on("click", function() {
        __expenses_details_oth( "mis" );
    });
    // oth
    $("#expenses-calculate #exp-adm-oth").on("click", function() {
        __expenses_details_oth( "oth" );
    });
}

// hidden gif, oth
$("#expenses-calculate #exp-mis-div").hide();
$("#expenses-calculate #exp-oth-div").hide();

// listening checkbox change
$(".login-modal2_component-copy #wf-form-Log-in-Form-2 input[type=checkbox]").each( function() {
    $(this).on("change", function() {
        let name = $(this).val();
        if ( $(this).is(":checked") ) {
            $("#expenses-calculate #exp-"+name+"-div").show();
        }else {
            $("#expenses-calculate #exp-"+name+"-div").hide();
            $("#expenses-calculate #exp-"+name).val('');
        }
        __expenses_details( name );
        __expenses_checked_box();
    });
});

// change text add more to edit if checkbox is checked 6
function __expenses_checked_box()
{
    let checked=0;
    $(".login-modal2_component-copy #wf-form-Log-in-Form-2 input[type=checkbox]").each( function() {
        if ($(this).is(":checked")) {
            checked += 1;
        }
    });
    if (checked == 6) {
        $("#expenses-calculate #exp-adm.parent>div").html("Edit More");
    }else {
        $("#expenses-calculate #exp-adm.parent>div").html("Add More");
    }
}










// SUMMARY

$("#finish-to-summary").on("click", function() {
    // let income = result('income');
    // let expenses = result('expenses');
    let income = _income;
    let expenses = _expenses;

    $("#calculate-summary #sum-inc").html( new Intl.NumberFormat().format(income.total) );
    $("#calculate-summary #sum-exp").html( new Intl.NumberFormat().format(expenses.total) );
    
    let sur = (income.total - expenses.total);
    // if (income.total > expenses.total){
    //     sur = income.total - expenses.total;
    // }else {
    //     sur = expenses.total - income.total;
    // }
    $("#calculate-summary #sum-sur").html( new Intl.NumberFormat().format(sur) );
    
    let list = expenses.list;
    hou = list.hou.ren + list.hou.gro + list.hou.fue + list.hou.hom + list.hou.oth;
    tra = list.tra.ren + list.tra.gro + list.tra.fue + list.tra.hom + list.tra.oth;
    foo = list.foo.ren + list.foo.gro + list.foo.fue + list.foo.hom + list.foo.oth;
    hea = list.hea.ren + list.hea.gro + list.hea.fue + list.hea.hom + list.hea.oth;
    oth = list.mis.ren + list.mis.gro + list.mis.fue + list.mis.hom + list.mis.oth + list.oth.oth || 0;
    $("#calculate-summary #hou-tot").html( new Intl.NumberFormat().format(hou) );
    $("#calculate-summary #hou-tot-color").css( "background-color", "rgba(197, 199, 101, 0.5)" );
    $("#calculate-summary #tra-tot").html( new Intl.NumberFormat().format(tra) );
    $("#calculate-summary #tra-tot-color").css( "background-color", "rgba(101, 150, 199, 0.5)" );
    $("#calculate-summary #foo-tot").html( new Intl.NumberFormat().format(foo) );
    $("#calculate-summary #foo-tot-color").css( "background-color", "rgba(101, 199, 147, 0.5)" );
    $("#calculate-summary #hea-tot").html( new Intl.NumberFormat().format(hea) );
    $("#calculate-summary #hea-tot-color").css( "background-color", "rgba(199, 101, 101, 0.5)" );
    $("#calculate-summary #oth-tot").html( new Intl.NumberFormat().format(oth) );
    $("#calculate-summary #oth-tot-color").css( "background-color", "rgba(189, 189, 189, 0.5)" );
    
    new Chart( $(".right-sum-chart>canvas"), {
        type: "doughnut",
        data: {
        //   labels: ['Housing', 'Transport', 'Food', 'Healthcare', 'Other'],
          datasets: [
            {
              label: 'Dataset',
              data: [hou, tra, foo, hea, oth]
            }
          ]
        },
        options: {
            datasets: {
                doughnut: {
                    offset: 0,
                    borderWidth: 0,
                    weight: 0,
                    backgroundColor: [
                        "rgba(197, 199, 101, 0.5)",
                        "rgba(101, 150, 199, 0.5)",
                        "rgba(101, 199, 147, 0.5)",
                        "rgba(199, 101, 101, 0.5)",
                        "rgba(189, 189, 189, 0.5)",
                    ],
                  },
            }
        }
    });

});




