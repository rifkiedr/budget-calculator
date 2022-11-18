
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
        employment: 0,
        saving: 0,
        pension: 0,
        benefits: 0,
        gift: 0,
        other: 0,
    }
};
let _expenses = {
    total: 0,
    list: {
        housing: {
            mortgage: 0,
            rent: 0,
            homeowners: 0,
            property: 0,
            maintenanceFees: 0,
            home: 0,
            housingCustomValue1: 0,
            housingCustomValue2: 0,
            housingCustomValue3: 0
        },
        transport: {
            vehicle: 0,
            fuel: 0,
            public: 0,
            vehicleMaintenance: 0,
            transportCustomValue1: 0,
            transportCustomValue2: 0,
            transportCustomValue3: 0
        },
        food: {
            groceries: 0,
            diningOut: 0,
            foodCustomValue1: 0,
            foodCustomValue2: 0,
            foodCustomValue3: 0
        },
        healthcare: {
            medication: 0,
            health: 0,
            medical: 0,
            healthcareCustomValue1: 0,
            healthcareCustomValue2: 0,
            healthcareCustomValue3: 0
        },
        miscellaneous: {
            entertainment: 0,
            travel: 0,
            hobbies: 0,
            gifts: 0,
            charity: 0,
            wedding: 0,
            miscellaneousCustomValue1: 0,
            miscellaneousCustomValue2: 0,
            miscellaneousCustomValue3: 0,
        },
        customCategory: {
            customCategoryValue1: 0,
            customCategoryValue2: 0,
            customCategoryValue3: 0,
            customCategoryValue4: 0,
            customCategoryValue5: 0,
            customCategoryValue6: 0
        }
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
    let employment = parseFloat( reverseFormatNumber( $("#income-calculate #employment").html() ) );
    let saving = parseFloat( reverseFormatNumber( $("#income-calculate #saving").html() ) );
    let pension = parseFloat( reverseFormatNumber( $("#income-calculate #pension").html() ) );
    let benefits = parseFloat( reverseFormatNumber( $("#income-calculate #benefits").html() ) );
    let gift = parseFloat( reverseFormatNumber( $("#income-calculate #gift").html() ) );
    let other = parseFloat( reverseFormatNumber( $("#income-calculate #other").html() ) );
    // set total
    let total = employment + saving + pension + benefits + gift + other;
    total = Math.round(total);
    // output to html
    $("#income-calculate #income-total").html( formatNumber( total.toFixed(0) ) );
    // save to storage
    _income = {
        total: total,
        list: {
            employment: employment,
            saving: saving,
            pension: pension,
            benefits: benefits,
            gift: gift,
            other: other,
        }
    };
    insert('income', _income);
}

// calculate income details
function __income_details( name )
{
    // setup ipt, drp, inc
    let ipt = $("#income-calculate #"+name+"");
    let drp = $("#income-calculate #frequency-"+name+"");
    let inc = $("#income-calculate #income-"+name+"");
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
    total = Math.round( total );
    // output to html
    inc.html( formatNumber( total.toFixed(0) ) );
    // calculate income total
    __income();
}

// listing all input income
function __listing_income()
{
    // emp
    $("#income-calculate #employment").on("change", function() {
        __income_details('employment');
    });
    $("#income-calculate #frequency-employment").on("change", function() {
        __income_details('employment');
    });
    // sav
    $("#income-calculate #saving").on("change", function() {
        __income_details('saving');
    });
    $("#income-calculate #frequency-saving").on("change", function() {
        __income_details('saving');
    });
    // pen
    $("#income-calculate #pension").on("change", function() {
        __income_details('pension');
    });
    $("#income-calculate #frequency-pension").on("change", function() {
        __income_details('pension');
    });
    // ben
    $("#income-calculate #benefits").on("change", function() {
        __income_details('benefits');
    });
    $("#income-calculate #frequency-benefits").on("change", function() {
        __income_details('benefits');
    });
    // gif
    $("#income-calculate #gift").on("change", function() {
        __income_details('gift');
    });
    $("#income-calculate #frequency-gift").on("change", function() {
        __income_details('gift');
    });
    // oth
    $("#income-calculate #other").on("change", function() {
        __income_details('other');
    });
    $("#income-calculate #frequency-other").on("change", function() {
        __income_details('other');
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
        $("#income-calculate #income-add-more>div").html("Edit");
    }else {
        $("#income-calculate #income-add-more>div").html("Add More");
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
    _expenses.list.hou.oth = 0;
    _expenses.list.tra.oth = 0;
    _expenses.list.foo.oth = 0;
    _expenses.list.hea.oth = 0;
    _expenses.list.mis.oth = 0;
    _expenses.list.oth.oth = 0;
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
        total = Math.round( total );
        // check
        if ( (store_name=='ren') || (store_name=='gro') || (store_name=='fue') || (store_name=='hom') || (store_name=='mis') ) {
            _expenses.list[name][store_name] = total;
        }else {
            _expenses.list[name].oth += total;
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
    let oth = '<div class="form-content-inside-wrapper inside"><div class="margin-bottom margin-tiny"><input type="text" class="text-field-6 input-text w-input" maxlength="256" name="employment" data-name="employment" placeholder="Custom Subcategory"></div><div class="w-layout-grid grid-23"><input type="text"class="text-field-6 w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a94-64b2bd7d w-input"maxlength="256" name="employment" data-name="employment" placeholder="$" id="oth-'+oth_length+'"><select id="drp-oth-'+oth_length+'" name="field" data-name="Field"class="select-field-4 w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a95-64b2bd7d w-select"><option value="week">Per week</option><option value="month">Per month</option><option value="year">Per year</option></select></div>';
    // inject oth to html
    if (oth_length <= 2) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details>div>.wrapping-oth").append(oth);
    }
    if (oth_length >= 2) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details #exp-adm>div").html("Edit Subcategory");
    }
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
        $("#expenses-calculate #exp-adm.parent>div").html("Edit");
    }else {
        $("#expenses-calculate #exp-adm.parent>div").html("Add More");
    }
}










// SUMMARY

$("#finish-to-summary").on("click", function() {
    let income = _income;
    let expenses = _expenses;

    $("#calculate-summary #sum-inc").html( new Intl.NumberFormat().format(income.total) );
    $("#calculate-summary #sum-exp").html( new Intl.NumberFormat().format(expenses.total) );
    
    let sur = (income.total - expenses.total);
    $("#calculate-summary #sum-sur").html( new Intl.NumberFormat().format(sur) );
    
    let list = expenses.list;
    hou = list.hou.ren + list.hou.gro + list.hou.fue + list.hou.hom + list.hou.oth;
    tra = list.tra.ren + list.tra.gro + list.tra.fue + list.tra.hom + list.tra.oth;
    foo = list.foo.ren + list.foo.gro + list.foo.fue + list.foo.hom + list.foo.oth;
    hea = list.hea.ren + list.hea.gro + list.hea.fue + list.hea.hom + list.hea.oth;
    oth = list.mis.ren + list.mis.gro + list.mis.fue + list.mis.hom + list.mis.oth + list.oth.oth;
    $("#calculate-summary #hou-tot").html( new Intl.NumberFormat().format(hou) );
    $("#calculate-summary #hou-tot-color").css( "background-color", "rgba(248, 210, 52, 1)" );
    $("#calculate-summary #tra-tot").html( new Intl.NumberFormat().format(tra) );
    $("#calculate-summary #tra-tot-color").css( "background-color", "rgba(145, 181, 183, 1)" );
    $("#calculate-summary #foo-tot").html( new Intl.NumberFormat().format(foo) );
    $("#calculate-summary #foo-tot-color").css( "background-color", "rgba(176, 174, 200, 1)" );
    $("#calculate-summary #hea-tot").html( new Intl.NumberFormat().format(hea) );
    $("#calculate-summary #hea-tot-color").css( "background-color", "rgba(234, 204, 184, 1)" );
    $("#calculate-summary #oth-tot").html( new Intl.NumberFormat().format(oth) );
    $("#calculate-summary #oth-tot-color").css( "background-color", "rgba(155, 155, 155, 1)" );
    
    let chart = new Chart( $(".right-sum-chart>canvas"), {
        type: "doughnut",
        data: {
          labels: ['Housing', 'Transport', 'Food', 'Healthcare', 'Other'],
          datasets: [
            {
              label: 'Dataset',
              data: [hou, tra, foo, hea, oth]
            }
          ]
        },
        options: {
            plugins:{
                legend: {
                  display: false,
                }
            },
            datasets: {
                doughnut: {
                    offset: 0,
                    borderWidth: 0,
                    weight: 0,
                    backgroundColor: [
                        "rgba(248, 210, 52, 1)",
                        "rgba(145, 181, 183, 1)",
                        "rgba(176, 174, 200, 1)",
                        "rgba(234, 204, 184, 1)",
                        "rgba(155, 155, 155, 1)",
                    ],
                },
            },
            
        }
    });


    if (sur <= 0) {
        $("#calculate-invest").hide();
    }

    $("#calculate-invest #inv-amount").val( sur );

    __listing_invest_and_grow();

});






// INVEST & GROW

// listing all input
function __listing_invest_and_grow() {
    let chart = new Chart( $(".right-inv-chart>canvas"), {
        type: "line",
        options: {
            plugins:{
                legend: {
                  display: false,
                }
            },
            datasets: {
                line: {
                    offset: 0,
                    weight: 0,
                    tension: 0.4,
                    borderColor: 'rgba(197, 199, 101, 0.5)',
                },
            },
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            console.log(index);
                            return '£' + formatNumber(value);
                        }
                    }
                }
            }
        }
    });
    
    chart.data = __invest_and_grow();
    chart.update();

    $("#calculate-invest #inv-portfolio").on("change", function() {
        chart.data = __invest_and_grow();
        chart.update();
    });
    $("#calculate-invest #inv-amount").on("change", function() {
        chart.data = __invest_and_grow();
        chart.update();
    });
    $("#calculate-invest #inv-periode").on("change", function() {
        chart.data = __invest_and_grow();
        chart.update();
    });
}

// calculate invest & grow
function __invest_and_grow() {
    let chart;
    let total = [];
    let calculate;
    let of_years = [0, 5, 10, 15, 20];
    let of_years_labels = [];
    let portfolio_percent = {
        "Very Aggresive": 11,
        "Aggresive": 10,
        "Moderately Aggressive": 9,
        "Moderate": 8,
        "Moderately Conservative": 7,
        "Very Conservative": 6,
        "Physical Gold": 5,
    };

    let portfolio = $("#calculate-invest #inv-portfolio").val();
    let amount = parseFloat( $("#calculate-invest #inv-amount").val() );
    let periode = $("#calculate-invest #inv-periode").val();

    of_years.forEach( function(val) {
        if (periode == "One Time") {
            let calculate_portfolio = (portfolio_percent[portfolio]/100);
            calculate = amount * ((1+ calculate_portfolio ) ** val);
        }else {
            let diverter;
            if (periode == "Monthly") {
                diverter = val*12;
            }else {
                diverter = val*52;
            }
            let calculate_portfolio = (portfolio_percent[portfolio]/100)/12;
            calculate = (amount * ( (1 +calculate_portfolio) ** (diverter+1)-1 ) / calculate_portfolio) - amount;
        }
        calculate = Math.abs(calculate.toFixed(0));
        total.push( calculate );
        of_years_labels.push( val + " Years");
    });

    $("#calculate-invest #inv-total").html( "£"+formatNumber(total[4]) );

    return {
        labels: of_years_labels,
        datasets: [
          {
            label: 'Dataset',
            data: total
          }
        ]
    };
}