/*!
 * jQuery QueryBuilder Sortable
 * Enables search and auto-match.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

// Selectors.rule_and_group_containers = Selectors.rule_container + ', ' + Selectors.group_container;

QueryBuilder.define('typehead', function(options) {
    this.on('afterInit', function(e) {
        console.log('todo: init ahead datas here');

        var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
          'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
          'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
          'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
          'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
          'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
          'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];

        window.substringMatcher = function(strs) {
          strs = strs || states;
          return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substringRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
              if (substringRegex.test(str)) {
                matches.push(str);
              }
            });

            cb(matches);
          };
        };
    });

    this.on('getRuleInput.filter', function(rule) {
    // this.on('afterUpdateRuleValue', function(rule) {
        var name = arguments[2], $that;

        setTimeout(function(){
            $that.typeahead({
              hint: true,
              highlight: true,
              minLength: 1
            },
            {
              name: 'states',
              source: window.substringMatcher()
            });
        }, 0)
    });
}, {
    default_no_sortable: false
});
