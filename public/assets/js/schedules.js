document.addEventListener('DOMContentLoaded', function() {

  let blocks = {};
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      blocks = JSON.parse(this.responseText);
      let scheduleElement = document.getElementById('schedule');
      scheduleElement.innerHTML = ``;

      for(const block of blocks){

        const blockElement = document.createElement('div');
        const disabled = (block.claimedByUser ? "disabled" : "");
        const claimedByUser = (block.claimedByUser && block.claimedByUser.firstname ? block.claimedByUser.firstname : "");

        let claimButton = `<button id="${block.id}" class="claim_block btn btn-primary btn-small" ${disabled} href="#"  >CLAIM</button>`
        if(block.claimedByUser){
          claimButton = `<button id="${block.id}" class="claimed_block btn btn-danger btn-small" href="#"  >DROP</button>`
        }

        blockElement.innerHTML = `
              <div class="block">
                <div>
                  <span class="environment">${moment(block.start).format('dddd MMMM Do YYYY')}</strong></span>
                  <p>
                     <strong>${block.sub_market.name}</strong> - ${block.title}
                     <strong>${claimedByUser}</strong> - ${block.title}
                  </p>
                  <p><strong>${moment(block.start).format('h:mm a')} -  ${moment(block.end).format('h:mm a')}</strong></p>
                </div>
                <div class="text-align-right ">
                       ${claimButton}
                </div>
              </div>
            `;
        scheduleElement.appendChild(blockElement)
        console.log(block);
      }

      $('.claim_block').click(function(){
        console.log("click");
        const id = $(this).attr('id');
        console.log(id);
        $.ajax({
          'type':'PUT',
          'data':`claimedByUser=1`,
          'success':function(data) { console.log('success', data); getClaims(); },
          'error':function(){ console.error('error') },
          'url':`/blocks/${id}`,
          'cache':true
        });

      });

      $('.claimed_block').click(function(){
        console.log("click");
        const id = $(this).attr('id');
        console.log(id);
        $.ajax({
          'type':'PUT',
          'data':``,
          'success':function(data) { console.log('success', data); getClaims();  },
          'error':function(){ console.error('error') },
          'url':`/blocks/${id}/dropClaim`,
          'cache':true
        });

      });

    }
  };

  function getClaims() {
    xhttp.open("GET", "/blocks?sub_market.id=2", true);
    xhttp.send();
  }

  getClaims();

});
