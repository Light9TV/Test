    const STORAGE_KEY = "combo-routes-notebook-v1";

    // STEP 1:
    // Paste your Supabase Project URL and anon/publishable key below.
    // Do NOT paste a service_role or secret key here.
    const SUPABASE_URL = "https://abkcmqekvgqqufggxlyn.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_wsC5HEM7YnSygAkufKPV7w_zPXq6wqO";
    const CLOUD_TABLE = "combo_routes";

    const cloudConfigured =
      window.supabase &&
      SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes("PASTE_") &&
      !SUPABASE_ANON_KEY.includes("PASTE_");

    const supabaseClient = cloudConfigured
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      : null;

    const gamePresets = {
      "SSBU": {
        label: "SSBU",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Dash", "Walk", "Turnaround"] },
          { title: "Movement", items: ["SH", "FH", "FF", "RAR", "IRAR", "IDJ", "B-reverse", "Wavebounce", "Fast fall", "Ledge", "Platform"] },
          { title: "Normals", items: ["Jab", "F-tilt", "U-tilt", "D-tilt", "Dash attack", "F-smash", "U-smash", "D-smash"] },
          { title: "Aerials", items: ["Nair", "Fair", "Bair", "Uair", "Dair", "Dragdown", "Landing", "Autocancel"] },
          { title: "Grab / defense", items: ["Grab", "Pummel", "F-throw", "B-throw", "U-throw", "D-throw", "Tech chase", "Parry", "Spot dodge"] },
          { title: "Special markers", items: ["Kill confirm", "DI in", "DI out", "True", "Frame trap", "50/50"] }
        ]
      },
      "SSBM": {
        label: "SSBM",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Dash", "Walk", "Turnaround"] },
          { title: "Movement", items: ["SH", "FH", "FF", "Wavedash", "Waveland", "Dash dance", "Moonwalk", "Ledge dash", "Shield drop", "Platform drop", "No impact land"] },
          { title: "Normals", items: ["Jab", "F-tilt", "U-tilt", "D-tilt", "Dash attack", "F-smash", "U-smash", "D-smash"] },
          { title: "Aerials", items: ["Nair", "Fair", "Bair", "Uair", "Dair", "L-cancel", "Autocancel", "Drill", "Shine"] },
          { title: "Grab / defense", items: ["Grab", "Pummel", "F-throw", "B-throw", "U-throw", "D-throw", "Tech chase", "Crouch cancel", "ASDI down", "Powershield"] },
          { title: "Route markers", items: ["Kill confirm", "Chain grab", "Reaction tech chase", "Edgeguard", "DI in", "DI out", "SDI", "Platform", "Ledge"] }
        ]
      },
      "SF6": {
        label: "SF6",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Hold ←", "Hold ↓", "Charge ← →", "Charge ↓ ↑"] },
          { title: "Motion shortcuts", items: ["↓↘→", "↓↙←", "→↓↘", "←↓↙", "←↙↓↘→", "→↘↓↙←", "360", "720"] },
          { title: "Buttons", items: ["LP", "MP", "HP", "LK", "MK", "HK", "P", "K", "PP", "KK"] },
          { title: "Position / state", items: ["st.", "cr.", "j.", "meaty", "counter hit", "punish counter", "anti-air", "safe jump"] },
          { title: "System", items: ["Drive Rush", "DRc", "Drive Impact", "Parry", "Perfect Parry", "OD", "SA1", "SA2", "SA3", "CA"] },
          { title: "Route markers", items: ["link", "cancel", "wall splat", "corner", "side switch", "oki"] }
        ]
      },
      "Tekken 8": {
        label: "Tekken 8",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Hold →", "Hold ←", "Hold ↓"] },
          { title: "Buttons", items: ["1", "2", "3", "4", "1+2", "3+4", "1+4", "2+3", "Heat", "RA"] },
          { title: "Common moves", items: ["↘+1", "↘+2", "↙+4", "→→", "WR", "WS", "FC", "SS", "SSL", "SSR"] },
          { title: "Combo states", items: ["CH", "launch", "screw", "Tornado", "Heat Burst", "Heat Dash", "wall carry", "wall splat", "floor break", "balcony break"] },
          { title: "Timing", items: ["microdash", "delay", "dash cancel", "hold", "instant", "just frame"] }
        ]
      },
      "2XKO": {
        label: "2XKO",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Dash", "Backdash"] },
          { title: "Buttons", items: ["L", "M", "H", "S1", "S2", "T", "Assist 1", "Assist 2", "Throw"] },
          { title: "Motion shortcuts", items: ["↓↘→", "↓↙←", "→↓↘", "←↙↓↘→"] },
          { title: "System", items: ["launcher", "jump cancel", "tag launch", "DHC", "Burst", "Super", "Ultimate", "wall bounce"] },
          { title: "Route markers", items: ["assist call", "restand", "oki", "side switch", "corner carry", "snap"] }
        ]
      },
      "Marvel / VS": {
        label: "Marvel / VS",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Dash", "Air dash"] },
          { title: "Buttons", items: ["L", "M", "H", "S", "A1", "A2", "ATK+S", "Throw"] },
          { title: "System / states", items: ["launcher", "jump cancel", "air series", "OTG", "assist", "DHC", "X-Factor", "snapback", "restand"] }
        ]
      },
      "Custom": {
        label: "Custom",
        groups: [
          { title: "Directions", items: ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖", "Neutral", "Dash", "Backdash", "Jump"] },
          { title: "Generic buttons", items: ["Light", "Medium", "Heavy", "Special", "Super", "Assist", "Grab", "Parry", "Block"] },
          { title: "Route markers", items: ["link", "cancel", "delay", "counter hit", "punish", "corner", "oki", "side switch"] }
        ]
      }
    };

    const tokenMeta = {
      "st.": "standing", "cr.": "crouching", "j.": "jumping", "DRc": "Drive Rush cancel", "OD": "Overdrive",
      "SA1": "Super Art 1", "SA2": "Super Art 2", "SA3": "Super Art 3", "CA": "Critical Art",
      "SH": "short hop", "FH": "full hop", "FF": "fast fall", "RAR": "reverse aerial rush", "IRAR": "instant reverse aerial rush", "IDJ": "instant double jump",
      "Wavedash": "air dodge diagonally into the ground", "Waveland": "air dodge onto a platform or ground", "L-cancel": "reduced landing lag on aerials", "ASDI down": "automatic smash directional influence down",
      "WR": "while running", "WS": "while standing", "FC": "full crouch", "SS": "sidestep", "SSL": "sidestep left", "SSR": "sidestep right",
      "CH": "counter hit", "RA": "Rage Art", "DHC": "delayed hyper combo / tag super follow-up"
    };

    const routePreview = document.getElementById("routePreview");
    const palette = document.getElementById("palette");
    const gameSelect = document.getElementById("game");
    const gameFilter = document.getElementById("gameFilter");
    const routeList = document.getElementById("routeList");
    const form = document.getElementById("comboForm");
    const toastEl = document.getElementById("toast");

    let routes = loadRoutes();
    let currentRoute = [];

    function loadRoutes() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (error) {
        console.warn("Could not load routes", error);
      }
      return starterRoutes();
    }

    function saveRoutes() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
      updateStats();
    }

    function starterRoutes() {
      const now = new Date().toISOString();
      return [
        {
          id: crypto.randomUUID(), game: "SF6", character: "Terry", name: "Simple corner cashout",
          starter: "cr.MP", damage: "Add your real number", meter: "Drive + super optional", position: "Corner", difficulty: "Medium",
          tags: ["starter example", "corner"], favorite: true,
          routeTokens: ["cr.", "MP", "xx", "↓↘→", "HP", "›", "Drive Rush", "›", "cr.", "HP", "xx", "SA3"],
          notes: "Starter example. Edit or delete this after adding your own labbed route.", createdAt: now, updatedAt: now
        },
        {
          id: crypto.randomUUID(), game: "SSBU", character: "Terry", name: "Readable Smash example",
          starter: "D-tilt", damage: "Percent dependent", meter: "GO optional", position: "Midscreen", difficulty: "Easy",
          tags: ["starter example", "confirm"], favorite: false,
          routeTokens: ["D-tilt", "›", "D-tilt", "›", "Burn Knuckle", "or", "Power Dunk"],
          notes: "Use route cards for percent windows, DI notes, and kill confirm reminders.", createdAt: now, updatedAt: now
        },
        {
          id: crypto.randomUUID(), game: "Tekken 8", character: "Jin", name: "Wall carry shell",
          starter: "↘+2", damage: "Update after testing", meter: "Heat optional", position: "Midscreen → wall", difficulty: "Medium",
          tags: ["starter example", "wall carry"], favorite: false,
          routeTokens: ["↘+2", "›", "launch", "›", "microdash", "›", "Tornado", "›", "wall carry", "›", "wall splat"],
          notes: "Tekken limb buttons still use 1/2/3/4, but directions stay as arrows.", createdAt: now, updatedAt: now
        }
      ];
    }

    function escapeHtml(value = "") {
      return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
    }

    function tokenClass(token) {
      if (["↑","↗","→","↘","↓","↙","←","↖"].includes(token)) return "direction";
      if (["›", "+", "xx", "or", ","].includes(token)) return "connector";
      if (["Drive Rush", "DRc", "OD", "SA1", "SA2", "SA3", "CA", "Heat", "Heat Burst", "Heat Dash", "Tornado", "launcher", "jump cancel", "DHC"].includes(token)) return "meta";
      return "";
    }

    function tokenHtml(token) {
      const title = tokenMeta[token] ? ` title="${escapeHtml(tokenMeta[token])}"` : "";
      return `<span class="token ${tokenClass(token)}"${title}>${escapeHtml(token)}</span>`;
    }

    function addToken(token) {
      currentRoute.push(token);
      renderRoutePreview();
    }

    function renderRoutePreview() {
      document.getElementById("routeCount").textContent = `${currentRoute.length} token${currentRoute.length === 1 ? "" : "s"}`;
      if (!currentRoute.length) {
        routePreview.innerHTML = `<span class="empty-preview">Your route will appear here with big readable chips.</span>`;
        return;
      }
      routePreview.innerHTML = currentRoute.map(tokenHtml).join("");
    }

    function populateGameSelects() {
      const games = Object.keys(gamePresets);
      gameSelect.innerHTML = games.map(game => `<option value="${escapeHtml(game)}">${escapeHtml(game)}</option>`).join("");
      gameFilter.innerHTML = `<option value="all">All games</option>` + games.map(game => `<option value="${escapeHtml(game)}">${escapeHtml(game)}</option>`).join("");
    }

    function renderPalette() {
      const preset = gamePresets[gameSelect.value] || gamePresets.Custom;
      palette.innerHTML = preset.groups.map(group => `
        <div class="palette-section">
          <div class="palette-title"><span>${escapeHtml(group.title)}</span></div>
          <div class="button-grid">
            ${group.items.map(item => `<button class="token-btn ${tokenClass(item)}" type="button" data-token="${escapeHtml(item)}" title="${escapeHtml(tokenMeta[item] || item)}">${escapeHtml(item)}</button>`).join("")}
          </div>
        </div>
      `).join("");
    }

    function getFormData() {
      return {
        id: document.getElementById("comboId").value || crypto.randomUUID(),
        game: gameSelect.value,
        character: document.getElementById("character").value.trim(),
        name: document.getElementById("routeName").value.trim(),
        starter: document.getElementById("starter").value.trim(),
        damage: document.getElementById("damage").value.trim(),
        meter: document.getElementById("meter").value.trim(),
        position: document.getElementById("position").value.trim(),
        difficulty: document.getElementById("difficulty").value,
        tags: document.getElementById("tags").value.split(",").map(t => t.trim()).filter(Boolean),
        routeTokens: [...currentRoute],
        notes: document.getElementById("notes").value.trim(),
        isPublic: document.getElementById("isPublic")?.checked || false,
        favorite: routes.find(route => route.id === document.getElementById("comboId").value)?.favorite || false,
      };
    }

    function fillForm(route) {
      document.getElementById("comboId").value = route.id;
      gameSelect.value = route.game in gamePresets ? route.game : "Custom";
      renderPalette();
      document.getElementById("character").value = route.character || "";
      document.getElementById("routeName").value = route.name || "";
      document.getElementById("starter").value = route.starter || "";
      document.getElementById("damage").value = route.damage || "";
      document.getElementById("meter").value = route.meter || "";
      document.getElementById("position").value = route.position || "";
      document.getElementById("difficulty").value = route.difficulty || "Medium";
      document.getElementById("tags").value = (route.tags || []).join(", ");
      document.getElementById("notes").value = route.notes || "";
      document.getElementById("isPublic").checked = !!route.isPublic;
      currentRoute = [...(route.routeTokens || [])];
      renderRoutePreview();
      document.getElementById("saveBtn").textContent = "Update route";
      document.getElementById("deleteEditingBtn").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetForm() {
      form.reset();
      document.getElementById("comboId").value = "";
      gameSelect.value = "SSBU";
      document.getElementById("difficulty").value = "Medium";
      currentRoute = [];
      renderRoutePreview();
      renderPalette();
      document.getElementById("saveBtn").textContent = "Save route";
      document.getElementById("deleteEditingBtn").hidden = true;
      document.getElementById("isPublic").checked = false;
      document.getElementById("character").focus();
    }

    function readableRoute(tokens = []) {
      return tokens.join(" ").replace(/\s+([+,])\s+/g, " $1 ").replace(/\s+›\s+/g, " › ").trim();
    }

    function renderRoutes() {
      const query = document.getElementById("search").value.trim().toLowerCase();
      const game = gameFilter.value;
      const sortMode = document.getElementById("sortMode").value;
      const favMode = document.getElementById("favFilter").value;

      let visible = routes.filter(route => {
        const haystack = [route.game, route.character, route.name, route.starter, route.damage, route.meter, route.position, route.difficulty, route.notes, ...(route.tags || []), readableRoute(route.routeTokens)].join(" ").toLowerCase();
        return (game === "all" || route.game === game) && (favMode === "all" || route.favorite) && (!query || haystack.includes(query));
      });

      visible.sort((a,b) => {
        if (sortMode === "created") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortMode === "game") return `${a.game} ${a.character}`.localeCompare(`${b.game} ${b.character}`);
        if (sortMode === "character") return `${a.character} ${a.game}`.localeCompare(`${b.character} ${b.game}`);
        if (sortMode === "difficulty") return `${a.difficulty} ${a.character}`.localeCompare(`${b.difficulty} ${b.character}`);
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      if (!visible.length) {
        routeList.innerHTML = `<div class="empty-state"><strong>No routes found.</strong>Try changing the search/filter, or add a new route from the builder.</div>`;
        return;
      }

      routeList.innerHTML = visible.map(route => `
        <article class="combo-card">
          <div class="card-top">
            <div>
              <div class="combo-title">
                <h3>${escapeHtml(route.character)} — ${escapeHtml(route.name)}</h3>
                <span class="game-pill">${escapeHtml(route.game)}</span>
              </div>
              <div class="subline">${route.starter ? `Starter: ${escapeHtml(route.starter)}` : "No starter listed"}</div>
            </div>
            <div class="card-actions">
              <button class="icon-btn" data-action="favorite" data-id="${route.id}" title="Favorite">${route.favorite ? "★" : "☆"}</button>
              <button class="icon-btn" data-action="edit" data-id="${route.id}" title="Edit">✎</button>
              <button class="icon-btn" data-action="duplicate" data-id="${route.id}" title="Duplicate">⧉</button>
              <button class="icon-btn" data-action="delete" data-id="${route.id}" title="Delete">×</button>
            </div>
          </div>

          <div class="card-route" aria-label="Readable route">
            ${(route.routeTokens || []).length ? route.routeTokens.map(tokenHtml).join("") : `<span class="empty-preview">No route tokens saved.</span>`}
          </div>

          <div class="meta-row">
            ${route.damage ? `<span class="meta-pill">Reward: ${escapeHtml(route.damage)}</span>` : ""}
            ${route.meter ? `<span class="meta-pill">${escapeHtml(route.meter)}</span>` : ""}
            ${route.position ? `<span class="meta-pill">${escapeHtml(route.position)}</span>` : ""}
            ${route.difficulty ? `<span class="meta-pill">${escapeHtml(route.difficulty)}</span>` : ""}
            ${route.isPublic ? `<span class="meta-pill">Public</span>` : ""}
          </div>

          ${(route.tags || []).length ? `<div class="tag-row">${route.tags.map(tag => `<span class="tag">#${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
          ${route.notes ? `<div class="notes">${escapeHtml(route.notes)}</div>` : ""}
        </article>
      `).join("");
    }

    function updateStats() {
      document.getElementById("statTotal").textContent = routes.length;
      document.getElementById("statGames").textContent = new Set(routes.map(route => route.game)).size;
      document.getElementById("statCharacters").textContent = new Set(routes.map(route => `${route.game}|${route.character.toLowerCase()}`)).size;
    }

    function showToast(message) {
      toastEl.textContent = message;
      toastEl.classList.add("show");
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toastEl.classList.remove("show"), 2200);
    }



    function setCloudStatus(message, mode = "") {
      const status = document.getElementById("cloudStatus");
      if (!status) return;
      status.textContent = message;
      status.classList.remove("ready", "warn");
      if (mode) status.classList.add(mode);
    }

    function getCloudEmailPassword() {
      return {
        email: document.getElementById("cloudEmail")?.value.trim(),
        password: document.getElementById("cloudPassword")?.value
      };
    }

    async function getCloudUser() {
      if (!supabaseClient) return null;
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) return null;
      return data.user;
    }

    function routeToCloudRow(route, userId) {
      return {
        id: route.id,
        user_id: userId,
        game: route.game || "",
        character: route.character || "",
        route_name: route.name || "",
        starter: route.starter || "",
        damage: route.damage || "",
        meter: route.meter || "",
        position: route.position || "",
        difficulty: route.difficulty || "Medium",
        tags: Array.isArray(route.tags) ? route.tags : [],
        favorite: !!route.favorite,
        route_tokens: Array.isArray(route.routeTokens) ? route.routeTokens : [],
        notes: route.notes || "",
        is_public: !!route.isPublic,
        created_at: route.createdAt || new Date().toISOString(),
        updated_at: route.updatedAt || new Date().toISOString()
      };
    }

    function cloudRowToRoute(row) {
      return {
        id: row.id,
        game: row.game || "Custom",
        character: row.character || "",
        name: row.route_name || "",
        starter: row.starter || "",
        damage: row.damage || "",
        meter: row.meter || "",
        position: row.position || "",
        difficulty: row.difficulty || "Medium",
        tags: Array.isArray(row.tags) ? row.tags : [],
        favorite: !!row.favorite,
        routeTokens: Array.isArray(row.route_tokens) ? row.route_tokens : [],
        notes: row.notes || "",
        isPublic: !!row.is_public,
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.updated_at || new Date().toISOString()
      };
    }

    function mergeRoutesFromCloud(cloudRoutes) {
      const merged = new Map(routes.map(route => [route.id, route]));

      cloudRoutes.forEach(cloudRoute => {
        const localRoute = merged.get(cloudRoute.id);
        if (!localRoute) {
          merged.set(cloudRoute.id, cloudRoute);
          return;
        }

        const localTime = new Date(localRoute.updatedAt || 0).getTime();
        const cloudTime = new Date(cloudRoute.updatedAt || 0).getTime();
        merged.set(cloudRoute.id, cloudTime > localTime ? cloudRoute : localRoute);
      });

      routes = Array.from(merged.values()).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
      saveRoutes();
      renderRoutes();
      updateStats();
    }

    async function saveRouteToCloud(route) {
      if (!supabaseClient) {
        setCloudStatus("Add Supabase URL/key", "warn");
        return false;
      }

      const user = await getCloudUser();
      if (!user) return false;

      const { error } = await supabaseClient
        .from(CLOUD_TABLE)
        .upsert(routeToCloudRow(route, user.id), { onConflict: "id" });

      if (error) throw error;
      return true;
    }

    async function deleteRouteFromCloud(id) {
      if (!supabaseClient) return;
      const user = await getCloudUser();
      if (!user) return;

      const { error } = await supabaseClient
        .from(CLOUD_TABLE)
        .delete()
        .eq("id", id);

      if (error) throw error;
    }

    async function maybeSaveRouteToCloud(route) {
      try {
        const saved = await saveRouteToCloud(route);
        if (saved) setCloudStatus("Cloud synced", "ready");
      } catch (error) {
        console.warn("Cloud save failed", error);
        setCloudStatus("Cloud save failed", "warn");
        showToast(`Cloud save failed: ${error.message}`);
      }
    }

    async function cloudSignUp() {
      if (!supabaseClient) {
        showToast("Paste your Supabase URL/key in script.js first.");
        setCloudStatus("Cloud not configured", "warn");
        return;
      }

      const { email, password } = getCloudEmailPassword();
      if (!email || !password) {
        showToast("Enter an email and password first.");
        return;
      }

      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) {
        showToast(error.message);
        return;
      }

      setCloudStatus("Account created", "ready");
      showToast("Account created. Check your email if Supabase asks for confirmation.");
    }

    async function cloudLogin() {
      if (!supabaseClient) {
        showToast("Paste your Supabase URL/key in script.js first.");
        setCloudStatus("Cloud not configured", "warn");
        return;
      }

      const { email, password } = getCloudEmailPassword();
      if (!email || !password) {
        showToast("Enter an email and password first.");
        return;
      }

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        showToast(error.message);
        return;
      }

      setCloudStatus(`Logged in as ${email}`, "ready");
      showToast("Logged in.");
    }

    async function cloudLogout() {
      if (!supabaseClient) return;
      await supabaseClient.auth.signOut();
      setCloudStatus("Logged out", "warn");
      showToast("Logged out.");
    }

    async function loadRoutesFromCloud() {
      if (!supabaseClient) {
        showToast("Paste your Supabase URL/key in script.js first.");
        setCloudStatus("Cloud not configured", "warn");
        return;
      }

      const user = await getCloudUser();
      if (!user) {
        showToast("Log in first.");
        return;
      }

      const { data, error } = await supabaseClient
        .from(CLOUD_TABLE)
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        showToast(error.message);
        return;
      }

      mergeRoutesFromCloud((data || []).map(cloudRowToRoute));
      setCloudStatus("Cloud routes loaded", "ready");
      showToast(`Loaded ${data.length} cloud route${data.length === 1 ? "" : "s"}.`);
    }

    async function pushLocalRoutesToCloud() {
      if (!supabaseClient) {
        showToast("Paste your Supabase URL/key in script.js first.");
        setCloudStatus("Cloud not configured", "warn");
        return;
      }

      const user = await getCloudUser();
      if (!user) {
        showToast("Log in first.");
        return;
      }

      for (const route of routes) {
        await saveRouteToCloud(route);
      }

      setCloudStatus("All local routes pushed", "ready");
      showToast(`Pushed ${routes.length} local route${routes.length === 1 ? "" : "s"} to cloud.`);
    }

    async function initializeCloud() {
      if (!supabaseClient) {
        setCloudStatus("Cloud not configured yet", "warn");
        return;
      }

      const user = await getCloudUser();
      if (user) {
        setCloudStatus(`Logged in as ${user.email}`, "ready");
      } else {
        setCloudStatus("Ready to log in", "");
      }

      supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setCloudStatus(`Logged in as ${session.user.email}`, "ready");
        } else {
          setCloudStatus("Logged out", "warn");
        }
      });
    }

    function download(filename, text) {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function copyText(text) {
      navigator.clipboard?.writeText(text).then(() => showToast("Copied readable notation."), () => showToast("Copy failed. Select the route and copy manually."));
    }

    palette.addEventListener("click", event => {
      const button = event.target.closest("[data-token]");
      if (!button) return;
      addToken(button.dataset.token);
    });

    gameSelect.addEventListener("change", renderPalette);

    document.getElementById("addManualBtn").addEventListener("click", () => {
      const input = document.getElementById("manualToken");
      const value = input.value.trim();
      if (!value) return;
      addToken(value);
      input.value = "";
      input.focus();
    });

    document.getElementById("manualToken").addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addManualBtn").click();
      }
    });

    document.getElementById("undoBtn").addEventListener("click", () => { currentRoute.pop(); renderRoutePreview(); });
    document.getElementById("spaceBtn").addEventListener("click", () => addToken("›"));
    document.getElementById("plusBtn").addEventListener("click", () => addToken("+"));
    document.getElementById("cancelBtn").addEventListener("click", () => addToken("xx"));
    document.getElementById("clearRouteBtn").addEventListener("click", () => { currentRoute = []; renderRoutePreview(); });
    document.getElementById("newBtn").addEventListener("click", resetForm);

    form.addEventListener("submit", async event => {
      event.preventDefault();
      const data = getFormData();
      if (!data.character || !data.name) {
        showToast("Add a character and route name first.");
        return;
      }
      if (!data.routeTokens.length) {
        showToast("Add at least one route token.");
        return;
      }

      const now = new Date().toISOString();
      const existingIndex = routes.findIndex(route => route.id === data.id);
      let savedRoute;

      if (existingIndex >= 0) {
        savedRoute = { ...routes[existingIndex], ...data, updatedAt: now };
        routes[existingIndex] = savedRoute;
        showToast("Route updated locally.");
      } else {
        savedRoute = { ...data, createdAt: now, updatedAt: now };
        routes.unshift(savedRoute);
        showToast("Route saved locally.");
      }

      saveRoutes();
      await maybeSaveRouteToCloud(savedRoute);
      renderRoutes();
      resetForm();
    });

    document.getElementById("copyBtn").addEventListener("click", () => {
      const data = getFormData();
      const lines = [
        `${data.game} | ${data.character || "Character"} — ${data.name || "Route"}`,
        data.starter ? `Starter: ${data.starter}` : "",
        `Route: ${readableRoute(data.routeTokens)}`,
        data.damage ? `Reward: ${data.damage}` : "",
        data.notes ? `Notes: ${data.notes}` : ""
      ].filter(Boolean);
      copyText(lines.join("\n"));
    });

    document.getElementById("deleteEditingBtn").addEventListener("click", async () => {
      const id = document.getElementById("comboId").value;
      if (!id) return;
      if (!confirm("Delete this route?")) return;
      routes = routes.filter(route => route.id !== id);
      saveRoutes();
      await deleteRouteFromCloud(id);
      renderRoutes();
      resetForm();
      showToast("Route deleted.");
    });

    routeList.addEventListener("click", async event => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const route = routes.find(item => item.id === button.dataset.id);
      if (!route) return;

      if (button.dataset.action === "edit") fillForm(route);
      if (button.dataset.action === "favorite") {
        route.favorite = !route.favorite;
        route.updatedAt = new Date().toISOString();
        saveRoutes();
        await maybeSaveRouteToCloud(route);
        renderRoutes();
      }
      if (button.dataset.action === "duplicate") {
        const copy = { ...route, id: crypto.randomUUID(), name: `${route.name} copy`, favorite: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        routes.unshift(copy);
        saveRoutes();
        await maybeSaveRouteToCloud(copy);
        renderRoutes();
        showToast("Route duplicated.");
      }
      if (button.dataset.action === "delete") {
        if (!confirm(`Delete ${route.character} — ${route.name}?`)) return;
        routes = routes.filter(item => item.id !== route.id);
        saveRoutes();
        await deleteRouteFromCloud(route.id);
        renderRoutes();
        showToast("Route deleted.");
      }
    });

    ["search", "gameFilter", "sortMode", "favFilter"].forEach(id => {
      document.getElementById(id).addEventListener("input", renderRoutes);
      document.getElementById(id).addEventListener("change", renderRoutes);
    });

    document.getElementById("exportBtn").addEventListener("click", () => {
      const stamp = new Date().toISOString().slice(0,10);
      download(`combo-routes-${stamp}.json`, JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), routes }, null, 2));
    });

    document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
    document.getElementById("importFile").addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const imported = Array.isArray(parsed) ? parsed : parsed.routes;
          if (!Array.isArray(imported)) throw new Error("No routes array found");
          const existingIds = new Set(routes.map(route => route.id));
          const normalized = imported.map(route => ({
            ...route,
            id: existingIds.has(route.id) ? crypto.randomUUID() : (route.id || crypto.randomUUID()),
            tags: Array.isArray(route.tags) ? route.tags : [],
            routeTokens: Array.isArray(route.routeTokens) ? route.routeTokens : [],
            createdAt: route.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }));
          routes = [...normalized, ...routes];
          saveRoutes();
          renderRoutes();
          showToast(`Imported ${normalized.length} route${normalized.length === 1 ? "" : "s"}.`);
        } catch (error) {
          showToast("Import failed. Make sure it is a valid exported JSON file.");
        }
        event.target.value = "";
      };
      reader.readAsText(file);
    });

    document.getElementById("printBtn").addEventListener("click", () => window.print());

    window.addEventListener("keydown", event => {
      const tagName = document.activeElement?.tagName;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(tagName);
      if (typing) return;
      const keyMap = { ArrowUp: "↑", ArrowRight: "→", ArrowDown: "↓", ArrowLeft: "←" };
      if (keyMap[event.key]) { event.preventDefault(); addToken(keyMap[event.key]); }
      if (event.key === "Backspace") { event.preventDefault(); currentRoute.pop(); renderRoutePreview(); }
      if (event.key === "+" || event.key === "=") { event.preventDefault(); addToken("+"); }
      if (event.key === ".") { event.preventDefault(); addToken("›"); }
      if (event.key === "Enter") { event.preventDefault(); form.requestSubmit(); }
    });

    document.getElementById("cloudSignUpBtn")?.addEventListener("click", cloudSignUp);
    document.getElementById("cloudLoginBtn")?.addEventListener("click", cloudLogin);
    document.getElementById("cloudLogoutBtn")?.addEventListener("click", cloudLogout);
    document.getElementById("cloudLoadBtn")?.addEventListener("click", loadRoutesFromCloud);
    document.getElementById("cloudPushBtn")?.addEventListener("click", pushLocalRoutesToCloud);

    initializeCloud();

    populateGameSelects();
    gameSelect.value = "SSBU";
    renderPalette();
    renderRoutePreview();
    renderRoutes();
    updateStats();
