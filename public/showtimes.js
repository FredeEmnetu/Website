$(document).ready(function(){
    let Key = '349e9c55'
    let id = "tt0059742"
    let jsonData;
    function posterDisplay(id){
        // const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${Key}`);
        // const data = await res.json();
        // jsonData = data;
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=${Key}`)
        .then(res => res.json())
        .then(data => {
            let title = document.getElementById("title")
            let year = document.getElementById("year")
            let runtime = document.getElementById("runtime")
            let director = document.getElementById("director")
            let writer = document.getElementById("writer")
            let actor = document.getElementById("actor")
            let plot = document.getElementById("plot")
            let rating = document.getElementById("rating")
            let imageSrc = `http://img.omdbapi.com/?apikey=${Key}&i=${id}`;
            // console.log(data);
            document.getElementById('poster').src = imageSrc;
            title.innerText = data.Title;
            year.innerText = data.Year;
            runtime.innerText = data.Runtime;
            director.innerText = data.Director;
            // writer.innerText = data.Writer;
            actor.innerText = data.Actors;
            plot.innerText = data.Plot;
            if($(rating).children().length > 1){
                
                $("#rating").empty();  
                for(let x = 0; x < parseInt(data.Ratings[0].Value, 10); x++){
                    img = document.createElement('img');
                    img.setAttribute("src", "./trophy.png")
                    rating.appendChild(img);
                }
            }else{
                for(let x = 0; x < parseInt(data.Ratings[0].Value, 10); x++){
                    img = document.createElement('img');
                    img.setAttribute("src", "./trophy.png")
                    rating.appendChild(img);
                }     
            }

            
        })
        

    }
    const Loaddata =  function(){
        posterDisplay(id);
        
        $(document).on('click', '.flex', function(){
                title = $(this).children().first().text();
                $.ajax({
                    type: 'GET',
                    url: '/showtimes_api',
                    data: {
                        "title": title,
                    },
                    dataType: "JSON",
                    success: function(response) {
                        // console.log(response[0].id)
                        posterDisplay(response[0].id);
                    }
                });
            });

        $('#submit').click(function (){
            let location = $('#locationID').val();
            let date = $('#dateID').val()
            dateArr = date.split("-")
            
            date = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2];

            $.ajax({
                type: "GET",
                url: "./showtimes_api",
                data: {
                    date: date,
                    location: location
                },
                dataType: "JSON",
                success: function(response){
                    console.log(response);
                    let table = document.getElementById("DynamicShowtimes");
                    
                    for(let x = 0; x < response.length; x++){
                        if(response[x].location === location && date === response[x].date){
                            
                            let div  = document.createElement('div');
                            $(div).attr("class", "flex");

                            let title  = document.createElement('div');
                            $(title).text(response[x].title);
                            $(div).append(title);
                            let times  = document.createElement('div');
                            $(times).attr("class", "flexStack")
                            for(let y = 0; y < response[x].times.length; y++){
                                let p = document.createElement('p')
                                $(p).text(response[x].times[y]);
                                // img = document.createElement('img'); // this was intended to add buy button but problem with sizings
                                                                        // occurred
                                // img.setAttribute("src", "/buy.png");
                                // img.setAttribute("height", "10")
                                // img.setAttribute("width", "10")
                                $(times).append(p);
                            }
                            $(div).append(times);
                            $(table).append(div);
                            hr = document.createElement('hr');
                        // $(table).append(br);
                            $(table).append(hr);
                        }else{
                            console.log("no results");
                        }
                        // br = document.createElement('br');
                        
                    }
                    
                    
                }
            });
        });
    }
    Loaddata();
    // function posterDisplay(id){
    //     let title = document.getElementById("title")
    //     let year = document.getElementById("year")
    //     let runtime = document.getElementById("runtime")
    //     let director = document.getElementById("director")
    //     let writer = document.getElementById("writer")
    //     let actor = document.getElementById("actor")
    //     let plot = document.getElementById("plot")
    //     let rating = document.getElementById("rating")
    //     let imageSrc = `http://img.omdbapi.com/?apikey=${Key}&i=${id}`;
    //     // console.log(data);
    //     document.getElementById('poster').src = imageSrc;
    //     title.innerText = data.Title;
    //     year.innerText = data.Year;
    //     runtime.innerText = data.Runtime;
    //     director.innerText = data.Director;
    //     // writer.innerText = data.Writer;
    //     // actor.innerText = data.Actors;
    //     // plot.innerText = data.Plot;

    // }
});