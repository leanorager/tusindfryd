class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.html = `<style>
      :host {
        display: block;
      }

      #login-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(238, 238, 238, 0.65);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        z-index: 9999;
        padding: var(--spacing-s, 16px);
      }

      .card {
        background: var(--color-white, #ffffff);
        padding: var(--spacing-3xl, 64px);
        max-width: 420px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2xs, 4px);
      }

      .logo {
        height: 24px;
        width: 282.46px;
        display: block;
        align-self: center;
        padding: var(--spacing-s, 16px);
      }

      .divider {
        height: 1px;
        background: var(--color-gray-100, #e4e4e4);
      }

      p {
        font-family: var(--font-helv, "Helvetica Neue", sans-serif);
        font-weight: 400;
        font-size: 14px;
        color: var(--color-gray-600, #6e6e6e);
        margin: 0;
        line-height: 1.5;
        padding-top: var(--spacing-s, 16px);
        padding-bottom: var(--spacing-2xs, 4px);
      }

      .input-wrap {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-s, 16px);
        padding-top: var(--spacing-xl, 40px);
      }

      label {
        font-family: var(--font-helv, "Helvetica Neue", sans-serif);
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-black, #000000);
      }

      input[type=password] {
        width: 100%;
        font-family: var(--font-helv, "Helvetica Neue", sans-serif);
        font-size: 13px;
        font-weight: 400;
        color: var(--color-black, #000000);
        background: transparent;
        border: 1px solid var(--color-gray-500, #8b8b8b);
        outline: none;
        padding: 15px 20px;
        box-sizing: border-box;
        transition: border-color 150ms;
        -webkit-appearance: none;
      }

      input[type=password]:focus {
        border-color: var(--color-black, #000000);
      }

      input[type=password]::placeholder {
        color: var(--color-gray-400, #c7c7c7);
      }

      button[type=submit] {
        width: 100%;
        height: 50px;
        background: var(--color-black, #000000);
        color: var(--color-white, #ffffff);
        font-family: var(--font-helv, "Helvetica Neue", sans-serif);
        font-size: 13px;
        font-weight: 400;
        border: none;
        cursor: pointer;
        transition: opacity 150ms;
        letter-spacing: 0.02em;
      }

      button[type=submit]:hover {
        opacity: 0.8;
      }

      .error {
        font-family: var(--font-helv, "Helvetica Neue", sans-serif);
        font-size: 12px;
        color: #c0392b;
        display: none;
      }

      .error.visible {
        display: block;
      }
    </style>

    <div id="login-overlay">
      <div class="card">
        <img src="/img/logo-word.png" alt="Tusindfryd" class="logo" />
        <div class="divider"></div>
        <p>Dette er et skoleprojekt. Kodeordet finder du i case-rapporten.</p>
        <form>
          <div class="input-wrap">
            <label for="pass">Kodeord</label>
            <input type="password" id="pass" name="pass" placeholder="••••••••" autocomplete="current-password" />
            <span class="error" id="error-msg">Forkert kodeord — prøv igen.</span>
          </div>
          <br />
          <button type="submit">Log ind</button>
        </form>
      </div>
    </div>`;
    this.render();

    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.shadowRoot.querySelector("input[name=pass]");
      const errorMsg = this.shadowRoot.querySelector("#error-msg");
      if (input.value === "gruppe11") {
        document.querySelector("#totally-delete-me").remove();
        localStorage.setItem("iform-totally-logged-in", true);
      } else {
        errorMsg.classList.add("visible");
        input.value = "";
        input.focus();
      }
    });
  }
  render() {
    this.shadowRoot.innerHTML = this.html;
  }
}
customElements.define("iform-login", Login);
window.addEventListener("load", () => {
  if (!localStorage.getItem("iform-totally-logged-in")) {
    const div = document.createElement("div");
    div.id = "totally-delete-me";
    div.style.position = "fixed";
    div.style.inset = "0";
    div.style.zIndex = "9999";
    div.innerHTML = "<iform-login></iform-login>";
    document.body.prepend(div);
  }
});
