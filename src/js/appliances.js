var getFieldset = document.getElementById('add').addEventListener('click', addFieldset);
var getButton = document.getElementById('remove').addEventListener('click', removeFieldset);

function addFieldset() {
  document.getElementsByTagName('main')[0].innerHTML +=
  `<fieldset class="aplliances">
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
  </fieldset>`;
}

function removeFieldset() {
  document.getElementsByTagName('fieldset')[0].remove();
}
