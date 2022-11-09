
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
        other: 0
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
        custom: {
            customValue1: 0,
            customValue2: 0,
            customValue3: 0,
            customCustomValue1: 0,
            customCustomValue2: 0,
            customCustomValue3: 0
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
    let employment = parseFloat( reverseFormatNumber( $("#income-calculate #income-employment").html() ) );
    let saving = parseFloat( reverseFormatNumber( $("#income-calculate #income-saving").html() ) );
    let pension = parseFloat( reverseFormatNumber( $("#income-calculate #income-pension").html() ) );
    let benefits = parseFloat( reverseFormatNumber( $("#income-calculate #income-benefits").html() ) );
    let gift = parseFloat( reverseFormatNumber( $("#income-calculate #income-gift").html() ) );
    let other = parseFloat( reverseFormatNumber( $("#income-calculate #income-other").html() ) );
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
    // each all expenses
    let list = result('expenses').list;
    Object.keys(list).forEach( function( key ) {
        Object.values(list[key]).forEach( function( value ) {
            total += value;
            // total += parseFloat( $(this).val() );
        });
    });
    // output to html
    $("#expenses-calculate #expenses-total").html( formatNumber( total.toFixed(0) ) );
    _expenses.total = total;
    insert('expenses', _expenses);
}

// calculate expenses details
function __expenses_details( name )
{
    // setup inc and total
    let total_all = 0;
    let total = 0;
    let inc = $("#expenses-calculate #exp-"+name+"-div #expenses-"+name+"");
    // each all input
    $("#expenses-calculate #exp-"+name+"-div .form-accordion-details input[id]").each( function() {
        // setup ipt, drp
        total=0;
        let ipt = $(this);
        let drp = $("#expenses-calculate #exp-"+name+"-div #frequency-expenses-"+ipt.attr('id'));
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

        _expenses.list[name][store_name] = total;
    });

    insert('expenses', _expenses);

    let list = result('expenses').list[name];
    Object.values(list).forEach( function( value ) {
        total_all += value;
    });

    // output to html
    inc.html( formatNumber( total_all.toFixed(0) ) );
    
    __expenses();
}

// calculate income details
function __expenses_details_oth( name )
{
    // set length
    let oth_length = $("#expenses-calculate #exp-"+name+"-div .form-accordion-details>div>.wrapping-add-more input[id]").length + 1;
    let prefix = name+"CustomValue"+oth_length;
    // set html
    let oth = '<div class="form-content-inside-wrapper inside"><div class="margin-bottom margin-tiny"><input type="text" class="text-field-6 input-text w-input" maxlength="256" name="Housing-Custom-1" data-name="Housing Custom 1" placeholder="Custom Subcategory"></div><div class="w-layout-grid grid-23"><input type="number" class="text-field-6 w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a94-e20add71 w-input" maxlength="256" name="'+prefix+'" data-name="'+prefix+'" placeholder="£0" id="'+prefix+'"><select id="frequency-expenses-'+prefix+'" name="frequency-expenses-'+prefix+'" data-name="frequency expenses housing 1" class="nice-select w-node-_66f1be5d-f12a-c460-4874-5b2be95a3a95-e20add71 w-select"><option value="week">Per week</option><option value="month">Per month</option><option value="year">Per year</option></select></div></div>';
    // inject oth to html
    if (oth_length <= 3) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details>div>.wrapping-add-more").append(oth);
    }
    if (oth_length >= 3) {
        $("#expenses-calculate #exp-"+name+"-div .form-accordion-details #expenses-"+name+"-add-more>div").html("Edit Subcategory");
    }
    // listen hou
    __listing_expenses();
}

// listing all input expenses
function __listing_expenses()
{
    // hou
    $("#expenses-calculate #exp-housing-div input[id]").on("change", function() {
        __expenses_details( "housing" );
    });
    $("#expenses-calculate #exp-housing-div select").on("change", function() {
        __expenses_details( "housing" );
    });
    // tra
    $("#expenses-calculate #exp-transport-div input[id]").on("change", function() {
        __expenses_details( "transport" );
    });
    $("#expenses-calculate #exp-transport-div select").on("change", function() {
        __expenses_details( "transport" );
    });
    // foo
    $("#expenses-calculate #exp-food-div input[id]").on("change", function() {
        __expenses_details( "food" );
    });
    $("#expenses-calculate #exp-food-div select").on("change", function() {
        __expenses_details( "food" );
    });
    // hea
    $("#expenses-calculate #exp-healthcare-div input[id]").on("change", function() {
        __expenses_details( "healthcare" );
    });
    $("#expenses-calculate #exp-healthcare-div select").on("change", function() {
        __expenses_details( "healthcare" );
    });
    // mis
    $("#expenses-calculate #exp-miscellaneous-div input[id]").on("change", function() {
        __expenses_details( "miscellaneous" );
    });
    $("#expenses-calculate #exp-miscellaneous-div select").on("change", function() {
        __expenses_details( "miscellaneous" );
    });
    // oth
    $("#expenses-calculate #exp-custom-div input[id]").on("change", function() {
        __expenses_details( "custom" );
    });
    $("#expenses-calculate #exp-custom-div select").on("change", function() {
        __expenses_details( "custom" );
    });
}

// listing add more change
function __add_more_expenses()
{
    // hou
    $("#expenses-calculate #expenses-housing-add-more").on("click", function() {
        __expenses_details_oth( "housing" );
    });
    // tra
    $("#expenses-calculate #expenses-transport-add-more").on("click", function() {
        __expenses_details_oth( "transport" );
    });
    // foo
    $("#expenses-calculate #expenses-food-add-more").on("click", function() {
        __expenses_details_oth( "food" );
    });
    // hea
    $("#expenses-calculate #expenses-healthcare-add-more").on("click", function() {
        __expenses_details_oth( "healthcare" );
    });
    // mis
    $("#expenses-calculate #expenses-miscellaneous-add-more").on("click", function() {
        __expenses_details_oth( "miscellaneous" );
    });
    // oth
    $("#expenses-calculate #expenses-custom-add-more").on("click", function() {
        __expenses_details_oth( "custom" );
    });
}

// hidden gif, oth
$("#expenses-calculate #exp-miscellaneous-div").hide();
$("#expenses-calculate #exp-custom-div").hide();

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
        $("#expenses-calculate #expenses-add-more>div").html("Edit");
    }else {
        $("#expenses-calculate #expenses-add-more>div").html("Add More");
    }
}










// SUMMARY

$("#finish-to-summary").on("click", function() {
    let income = _income;
    let expenses = _expenses;

    $("#summary-income").html( new Intl.NumberFormat().format(income.total) );
    $("#summary-expenses").html( new Intl.NumberFormat().format(expenses.total) );
    
    let sur = (income.total - expenses.total);
    $("#summary-surplus").html( new Intl.NumberFormat().format(sur) );
    
    let list = expenses.list;
    let summary = {housing:0, transport:0, food:0, healthcare:0, miscellaneous:0, custom:0};

    Object.keys(list).forEach( function(key) {
        Object.values(list[key]).forEach( function(value) {
            summary[key] += value;
        });
    });
    
    $("#housing-total").html( new Intl.NumberFormat().format( summary.housing ) );
    $("#transport-total").html( new Intl.NumberFormat().format( summary.transport ) );
    $("#food-total").html( new Intl.NumberFormat().format( summary.food ) );
    $("#healthcare-total").html( new Intl.NumberFormat().format( summary.healthcare ) );
    $("#other-total").html( new Intl.NumberFormat().format( summary.miscellaneous + summary.custom ) );
    
    $("#housing-total-color").css( "background-color", "rgba(197, 199, 101, 0.5)" );
    $("#transport-total-color").css( "background-color", "rgba(101, 150, 199, 0.5)" );
    $("#food-total-color").css( "background-color", "rgba(101, 199, 147, 0.5)" );
    $("#healthcare-total-color").css( "background-color", "rgba(199, 101, 101, 0.5)" );
    $("#other-total-color").css( "background-color", "rgba(189, 189, 189, 0.5)" );
    
    new Chart( $(".right-sum-chart>canvas"), {
        type: "doughnut",
        data: {
          labels: ['Housing', 'Transport', 'Food', 'Healthcare', 'Other'],
          datasets: [
            {
              label: 'Dataset',
              data: [summary.housing, summary.transport, summary.food, summary.healthcare, summary.miscellaneous+summary.custom]
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
                        "rgba(197, 199, 101, 0.5)",
                        "rgba(101, 150, 199, 0.5)",
                        "rgba(101, 199, 147, 0.5)",
                        "rgba(199, 101, 101, 0.5)",
                        "rgba(189, 189, 189, 0.5)",
                    ],
                },
            },
            
        }
    });

    if (sur <= 0) {
        $("#calculate-invest").hide();
    }

    $("#calculate-invest #invest-amount").val( sur );

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
                            return '£' + formatNumber(value);
                        }
                    }
                }
            }
        }
    });
    
    chart.data = __invest_and_grow();
    chart.update();

    $("#calculate-invest #invest-portfolio").on("change", function() {
        chart.data = __invest_and_grow();
        chart.update();
    });
    $("#calculate-invest #invest-amount").on("change", function() {
        chart.data = __invest_and_grow();
        chart.update();
    });
    $("#calculate-invest #invest-periode").on("change", function() {
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

    let portfolio = $("#calculate-invest #invest-portfolio").val();
    let amount = parseFloat( $("#calculate-invest #invest-amount").val() );
    let periode = $("#calculate-invest #invest-periode").val();

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

    $("#calculate-invest #invest-total").html( "£"+formatNumber(total[4]) );

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