
function TemplateSwapper(elements, active, testing){
  
  //validation
  if (!Array.isArray(elements))
    { throw new TypeError("elements must be a array"); }
  active = parseInt(active,null);
  if (typeof(active)!=="number")
    { throw new TypeError("active template must be a number"); }
  if (testing === undefined) {testing = false;}
  //validation
  
  //loop through selectors in elements and swap class lists for each
  for (var x = 0; x < elements.length; x++){
    var element;
	  //console.log(template[0].length);
    if (!testing){
	  switch(elements[x][0][0]){
		case ".":
			element = document.getElementsByClassName(elements[x][0].substr(1));
			break;
		case "#":
			element = document.getElementById(elements[x][0].substr(1));
			break;
		default:
			element = document.getElementsByTagName(elements[x][0]);
			break;
	  }
	  if (isCollection(element))
	  {
		// element is a class or tag list
		for (var z = 0; z < element.length; z++){
			if (element[z].getAttribute("data-selected-theme") != null)
			{	
				// there was a theme previously selected, remove that themes classes
				var index_of_classlist = parseInt(element[z].getAttribute("data-selected-theme"));
				var class_list_to_remove = elements[x][index_of_classlist].split(" ");
				for (var b = 0; b < class_list_to_remove.length; b++)
				{ 
					element[z].classList.remove(class_list_to_remove[b]);
				}
			}
			var class_list_to_add = elements[x][active].split(" ");
			for (var c = 0; c < class_list_to_add.length; c++)
			{
				element[z].classList.add(class_list_to_add[c]);
			}
			element[z].setAttribute("data-selected-theme",active);
		}
	  }	
	  else
	  {
		// element is and id
		if (element.getAttribute("data-selected-theme") != null)
		{	
			// there was a theme previously selected, remove that themes classes
			var index_of_classlist = parseInt(element.getAttribute("data-selected-theme"));
			var class_list_to_remove = elements[x][index_of_classlist].split(" ");
			for (var b = 0; b < class_list_to_remove.length; b++)
			{ 
				element.classList.remove(class_list_to_remove[b]);
			}
		}
		var class_list_to_add = elements[x][active].split(" ");
		for (var c = 0; c < class_list_to_add.length; c++)
		{
			element.classList.add(class_list_to_add[c]);
		}
		element.setAttribute("data-selected-theme",active);
	  }
    }
  }
	function isCollection(nodes){
		var result = Object.prototype.toString.call(nodes);
		if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
			return true;
		}
		return false;
	}
}

//test

// 1: selector to transform 2: theme1 class list 3: theme2 class list 4: etc.etc.
var db = [
  [".background_div",
		/*Theme 1*/"theme_1",
		/*Theme 2*/"theme_2",
		/*Theme 3*/"theme_3"
		],
  ["#header",
		"theme_1_header",
		"theme_2_header",
		"theme_3_header"
		],
  ["dt",
		"font-bold font-black",
		"font-bold font-blue",
		"font-bold font-red"
		],
   ["#my_favorite_animals",
		"font_large font-bold",
		"font-blue font-bold",
		"font_large font-bold font-red",
		]
];


// Run the function with the db of selectors and class lists, and the active theme number you want
TemplateSwapper(db,1);