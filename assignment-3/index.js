/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Chelsea Li
 * Email: lichel@oregonstate.edu
 */

var itemList = [];
var posts = document.getElementsByClassName('post');

for (var x = 0; x < posts.length; x++) {
    itemList.push([]);
    itemList[x].push(posts[x].children[0].children[0].children[0].alt);
    itemList[x].push(posts[x].children[0].children[0].children[0].src);
    itemList[x].push(posts[x].getAttribute('data-price'));
    itemList[x].push(posts[x].getAttribute('data-city'));
    itemList[x].push(posts[x].getAttribute('data-condition'));
}

document.getElementById('sell-something-button').addEventListener('click', function() {
    document.getElementById('modal-backdrop').style.display = 'inline';
    document.getElementById('sell-something-modal').style.display = 'inline';
});

function insertPost(index) {
    var newDivPost = document.createElement('div');
    newDivPost.className = "post";
    newDivPost.setAttribute("data-price", itemList[index][2]);
    newDivPost.setAttribute("data-city", itemList[index][3]);
    newDivPost.setAttribute("data-condition", itemList[index][4]);
    
    var newDivPostCont = document.createElement('div');
    newDivPostCont.className = "post-contents";
    newDivPost.appendChild(newDivPostCont);
    
    var newDivPostImg = document.createElement('div');
    newDivPostImg.className = "post-image-container";
    newDivPostCont.appendChild(newDivPostImg);

    var newImg = document.createElement('img');
    newImg.src = itemList[index][1];
    newImg.alt = itemList[index][0];
    newDivPostImg.appendChild(newImg);

    var newDivPostInfo = document.createElement('div');
    newDivPostInfo.className = "post-info-container";
    newDivPostCont.appendChild(newDivPostInfo);

    var newLink = document.createElement('a');
    var link = document.createTextNode(itemList[index][0]); 
    newLink.appendChild(link);
    newLink.href = "#";
    newLink.className = "post-title";
    newDivPostInfo.appendChild(newLink);

    var newSpanPrice = document.createElement('span');
    var price = document.createTextNode('$' + itemList[index][2]); 
    newSpanPrice.appendChild(price);
    newSpanPrice.className = "post-price";
    newLink.after(newSpanPrice);

    var newSpanCity = document.createElement('span');
    var city = document.createTextNode('(' + itemList[index][3] + ')'); 
    newSpanCity.appendChild(city);
    newSpanCity.className = "post-city";
    newSpanPrice.after(newSpanCity);

    document.getElementById('posts').appendChild(newDivPost);

    var cities = document.getElementById('filter-city');
    var included = false;

    for (var x = 0; x < cities.length; x++) {
        if (cities[x].value.toLowerCase() == itemList[index][3].toLowerCase()) {
            included = true;
        }
    }

    if (!included) {
        var option = document.createElement('option');
        option.text = itemList[index][3];
        cities.add(option, cities.length);
    }
}

function closeModal() {
    document.getElementById('modal-backdrop').style.display = 'none';
    document.getElementById('sell-something-modal').style.display = 'none';
    document.getElementById('post-text-input').value = "";
    document.getElementById('post-photo-input').value = "";
    document.getElementById('post-price-input').value = "";
    document.getElementById('post-city-input').value = "";
    document.getElementsByName('post-condition')[0].checked = true;
}

function filterPosts() {
    var posts = document.getElementsByClassName('post');
    var text = document.getElementById('filter-text').value.toLowerCase();
    var priceMin = document.getElementById('filter-min-price').value;
    var priceMax = document.getElementById('filter-max-price').value;
    var city = document.getElementById('filter-city').value;
    var condition = document.getElementsByName('filter-condition');

    while (posts.length > 0) {
        posts[0].remove();
    }

    for (var x = 0; x < itemList.length; x++) {
        var metCondition = false;
        var checked = 0;
       
        if (itemList[x][0].toLowerCase().includes(text.toLowerCase()) &&
            (priceMin == '' || parseInt(itemList[x][2], 10) >= priceMin) &&
            (priceMax == '' || parseInt(itemList[x][2], 10) <= priceMax) &&
            itemList[x][3].toLowerCase().includes(city.toLowerCase())) {
            
            for (var i = 0; i < condition.length; i++) {
                if (condition[i].checked) {
                    checked++;
    
                    if (itemList[x][4] == condition[i].value) {
                        metCondition = true;
                        break;
                    }
                }
            }

            if ((metCondition && checked > 0) || checked == 0) {
                insertPost(x);
            }
        }
    }
}

document.getElementById('modal-close').addEventListener('click', function() { closeModal(); });
document.getElementById('modal-cancel').addEventListener('click', function() { closeModal(); });

document.getElementById('modal-accept').addEventListener('click', function() {
    var radioVal = document.getElementsByName('post-condition');

    for (var x = 0; x < radioVal.length; x++) {
        if (radioVal[x].checked) {
            break;
        }
    }

    if (document.getElementById('post-text-input').value == "" || 
        document.getElementById('post-photo-input').value == "" || 
        document.getElementById('post-price-input').value == "" || 
        document.getElementById('post-city-input').value == "") {

        alert("Please fill out all of the input fields");
    } else {
        var itemLength = itemList.length;
        itemList.push([]);
        itemList[itemLength].push(document.getElementById('post-text-input').value);
        itemList[itemLength].push(document.getElementById('post-photo-input').value);
        itemList[itemLength].push(document.getElementById('post-price-input').value);
        itemList[itemLength].push(document.getElementById('post-city-input').value);
        itemList[itemLength].push(radioVal[x].value);

        closeModal();  
        filterPosts(); 
    }
});

document.getElementById('filter-update-button').addEventListener('click', function() { filterPosts(); });