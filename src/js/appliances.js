document.getElementById('add').addEventListener('click', addFieldset);
document.getElementById('remove').addEventListener('click', removeFieldset);

var appliances = document.getElementsByClassName('appliances');

function addFieldset() {
  appliances[appliances.length - 1].insertAdjacentHTML('afterend',
  `<fieldset class="appliances">
    <div class="field">
      <label for="appliance">Appliance name</label>
      <input id="appliance" type="text">
      <label for="voltage">Voltage <strong>(v)</strong></label>
      <input id="voltage" type="number" min="0">
      <label for="energy">Ampere <strong>(a)</strong></label>
      <input id="energy" type="number" min="0">
      <label for="power">Watt <strong>(w)</strong></label>
      <input id="power" type="number" min="0">
      <label for="quantity">Quantity</label>
      <input id="quantity" type="number" min="0">
    </div>
  </fieldset>`);
}

function removeFieldset() {
  if (appliances.length === 1) {
    return false;
  }

  appliances[appliances.length - 1].remove();
}
