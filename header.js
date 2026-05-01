document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  if (!header) return;
  header.innerHTML = `
    <div class="topbar">
      <div class="logo" onclick="window.location.href='index-bibliotheque.html'">
        <img src="into the shift fond blanc.png" alt="Into The Shift" class="logo-img">
      </div>
      <div class="tb-sp"></div>
      <div class="acct">
        <div class="av">SR</div>
        <span class="acct-n">Sonora RH</span>
      </div>
    </div>
  `;
});