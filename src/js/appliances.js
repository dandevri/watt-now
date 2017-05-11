document.getElementById('add').addEventListener('click', addFieldset);
document.getElementById('remove').addEventListener('click', removeFieldset);

function addFieldset() {
  document.getElementsByClassName('appliances')[document.getElementsByClassName('appliances').length - 1].insertAdjacentHTML('afterend',
  `<fieldset class="appliances">
    <div class="field">
      <label for="appliance">Appliance name</label>
      <input type="text">
      <label for="voltage">Voltage <strong>(v)</strong></label>
      <input type="number" min="0">
      <label for="energy">Ampere <strong>(a)</strong></label>
      <input type="number" min="0">
      <label for="power">Watt <strong>(w)</strong></label>
      <input type="number" min="0">
      <label for="quantity">Quantity</label>
      <input type="number" min="0">
    </div>
  </fieldset>`);
}

function removeFieldset() {
  document.getElementsByClassName('appliances')[document.getElementsByClassName('appliances').length - 1].remove();
}
