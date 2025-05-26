  const supabase = supabase.createClient(
    'https://estoque-matriz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRua2ltdm51Z3JyY2Z5c2ZxZHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODA0NTksImV4cCI6MjA2Mzg1NjQ1OX0.qxY-EyVtvKSqHTpu1HukZBnwQKo3eNALnDjlDj3g7AI'
  );
  async function carregarTecnicosDoSupabase() {
  const { data, error } = await supabase.from('tecnicos').select('*');
  if (error) {
    console.error('Erro ao carregar técnicos:', error.message);
    return;
  }
  techs.length = 0;
  techs.push(...data.map(t => t.nome));
}

  // Carrega dados do Supabase ao iniciar
async function carregarDoSupabase() {
  const { data, error } = await supabase.from('equipamentos').select('*');

  if (error) {
    alert('Erro ao carregar dados do Supabase: ' + error.message);
    return;
  }

  items.length = 0;
  items.push(...data);

  renderStock();
  renderTechInterface();
  renderInstalledList();
  renderPickupList();
}


    
    const categories = {
    "Box's": [
      "BOX 2.0 HD (CABO DCR 7151) CABO FA e LA",
      "BOX 2.0 HD (CABO DCR 7151)_C",
      "BOX 3.0 ULTRA HD (CABO ZC4431KNO) v2.1",
      "BOX 3.0 ULTRA HD (CABO ZD4500ZNO) CABO",
      "BOX IP SDMC DV9161",
      "DTA (INTEK)_v2",
      "PACK BOX APPLE TV 2021 - 64GB",
      "PACK BOX NVIDIA SHIELD TV"
    ],
    "Extender's": [
      "EXTENDER MESH WIFI SUPERPOD SAGEMCOM",
      "EXTENDER WIFI SUPERPOD SAGEMCOM_v1",
      "EXTENDER WIFI6 KAON"
    ],
    "Cartão SIM": [
      "Pack cartao SIM WOO 2024_Tecnico",
      "Pack Cartao Telemovel 5G S"
    ],
    "Router's": [
      "ROUTER FIBRA WOO 6.0(SAGEM FTTH)_UPDATED",
      "ROUTER WI-FI 5.0 FTTH (SAGEM) CABO E FTTH",
      "ROUTER WI-FI 6.0 FTTH (SAGEM) CABO E FTTH",
      "VOIP - ROUTER WI-FI (HUB 4.0) (CONS.)"
    ],
    "ONT'S": [
      "VOIP - ONT (HUAWEI H8012H) (CONS.)"
    ],
    "Telefones": [
      "VOIP - TELEFONE S/ FIOS CS1300bb (CONS.)"
    ]
  };


      const items = [];
      const techs = [];
  const rawSubLabelMap = {
    "ROUTER WI-FI 6.0 FTTH (SAGEM) CABO E FTTH": "ROUTER 6.0 FTTH",
    "ROUTER WI-FI 5.0 FTTH (SAGEM) CABO E FTTH": "ROUTER 5.0 FTTH",
    "ROUTER FIBRA WOO 6.0(SAGEM FTTH)_UPDATED": "ROUTER WOO",
    "VOIP - ROUTER WI-FI (HUB 4.0) (CONS.)": "ROUTER 4.0 FTTH",
    "Router WI-FI 6.0 FTTH XGSPON(F@ST5684RF)": "ROUTER 10GB",

    "BOX 3.0 ULTRA HD (CABO ZC4431KNO) v2.1": "BOX 3.0 UHD V2.1",
    "BOX 3.0 ULTRA HD (CABO ZD4500ZNO) CABO": "BOX 3.0 UHD",
    "BOX 2.0 HD (CABO DCR 7151) CABO FA e LA": "BOX 2.0 HD",
    "BOX 2.0 HD (CABO DCR 7151)_C": "BOX 2.0 HD",
    "BOX IP SDMC DV9161": "BOX WOO/ANDROID",
    "PACK BOX APPLE TV 2021 - 64GB": "BOX APPLE",
    "PACK BOX NVIDIA SHIELD TV": "BOX NVIDIA",
    "DTA (INTEK)_v2": "DTA",
    "DTA (INTEK)": "DTA",

    "Pack cartao SIM WOO 2024_Tecnico": "CHIP SIM WOO",
    "Pack Cartao Telemovel 5G S": "CHIP SIM NOS",
    "Pack cartão SIM WOO 2021_Tecnico": "CHIP WOO",
    "Pack Cartao Voz tarif. fatura (s/form)": "CHIP NOS",

    "EXTENDER WIFI6 KAON": "EXTENDER WIFI6 KAON",
    "EXTENDER MESH WIFI SUPERPOD SAGEMCOM": "EXTENDER MESH WIFI SUPERPOD SAGEMCOM",
    "EXTENDER WIFI SUPERPOD SAGEMCOM_v1": "EXTENDER WIFI SUPERPOD SAGEMCOM_v1",

    "VOIP - TELEFONE S/ FIOS CS1300bb (CONS.)": "TELEFONE CS1300",
    "VOIP - ONT (HUAWEI H8012H) (CONS.)": "ONT"
  };


  const subLabelMap = {};
  for (const key in rawSubLabelMap) {
    const normKey = key.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    subLabelMap[normKey] = rawSubLabelMap[key];
  }




      // Elements
      
      const categorySelect = document.getElementById('category');
      const subcategorySelect = document.getElementById('subcategory');
      const form = document.getElementById('form');
      const lostForm = document.getElementById('lost-form');
  const lostTech = document.getElementById('lost-tech');
  const lostSerial = document.getElementById('lost-serial');
  const lostList = document.getElementById('lost-list');
  const openLostBtn = document.getElementById('open-lost');

      const serialInput = document.getElementById('serial');
      const openFormBtn = document.getElementById('open-form');
      const openStockBtn = document.getElementById('open-stock');
      const openTechsBtn = document.getElementById('open-techs');
      const formContainer = document.getElementById('equipment-form');
      const stockContainer = document.getElementById('stock-view');
      const techsContainer = document.getElementById('techs-view');
      const stockContent = document.getElementById('stock-content');
      const searchInput = document.getElementById('search-input');
      const installForm = document.getElementById('install-form');
      const pickupForm = document.getElementById('pickup-form');

      const techNameInput = document.getElementById('tech-name');
      const addTechBtn = document.getElementById('add-tech');
      const techsList = document.getElementById('techs-list');
      const assignTech = document.getElementById('assign-tech');
      const assignSerial = document.getElementById('assign-serial'); 
      const installTech = document.getElementById('install-tech');
      const installSerial = document.getElementById('install-serial');
      const pickupTech = document.getElementById('pickup-tech');
      const pickupSerial = document.getElementById('pickup-serial');
      [serialInput, assignSerial, installSerial, pickupSerial].forEach(input => {
    input.classList.add('uppercase');
    input.addEventListener('input', () => {
      input.value = input.value.toUpperCase();
    });
  });
      const assignments = document.getElementById('assignments');

      // Populate categories
  function populateCategories() {
    const seen = new Set();
    categorySelect.innerHTML = '<option value="">Selecione...</option>';

    Object.keys(categories).forEach(cat => {
      if (!seen.has(cat)) {
        seen.add(cat);
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
      }
    });
  }
  function populatePickupCategories() {
    const catSel = document.getElementById('pickup-category');
    const subSel = document.getElementById('pickup-subcategory');

    catSel.innerHTML = '<option value="">-- Não selecionar --</option>';
    Object.keys(categories).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      catSel.appendChild(opt);
    });

    // quando categoria mudar, atualiza subcategorias
    catSel.addEventListener('change', () => {
      const cat = catSel.value;
      subSel.innerHTML = '<option value="">-- Não selecionar --</option>';
      if (categories[cat]) {
        categories[cat].forEach(sub => {
          const opt = document.createElement('option');
          opt.value = sub;
          opt.textContent = sub;
          subSel.appendChild(opt);
        });
      }
    });
  }



      function updateSubcategories() {
        const sel = categorySelect.value;
        subcategorySelect.innerHTML = '<option value="">Selecione...</option>';
        if (categories[sel]) categories[sel].forEach(sub => {
          const opt = document.createElement('option'); opt.value = sub; opt.textContent = sub;
          subcategorySelect.appendChild(opt);
        });
      }

  const subcategoriaOrdemFixa = [
    "ROUTER 6.0 FTTH",
    "ROUTER 5.0 FTTH",
    "ROUTER 4.0 FTTH",
    "ROUTER WOO",
    "ROUTER 10GB",

    "BOX 3.0 UHD V2.1",
    "BOX 3.0 UHD",
    "BOX 2.0 HD",
    "BOX WOO/ANDROID",
    "BOX APPLE",
    "BOX NVIDIA",
    "DTA",

    "CHIP SIM WOO",
    "CHIP SIM NOS",
    "CHIP WOO",
    "CHIP NOS",

    "EXTENDER WIFI6 KAON",
    "EXTENDER MESH WIFI SUPERPOD SAGEMCOM",
    "EXTENDER WIFI SUPERPOD SAGEMCOM_v1",

    "TELEFONE CS1300",
    "ONT"
  ];

      // Renderiza o estoque
  function renderStock(filter = '') {
    // 🧠 Salva as categorias e subcategorias que estavam abertas
  const openedAccordions = new Set(
    [...document.querySelectorAll('.accordion')].filter(a => a.nextElementSibling?.classList.contains('show')).map(a => a.textContent.trim())
  );

    stockContent.innerHTML = '';

    const grouped = items.reduce((acc, item) => {
      if (filter && !item.numeroSerie.includes(filter)) return acc;
      acc[item.categoria] = acc[item.categoria] || {};
      acc[item.categoria][item.subcategoria] = acc[item.categoria][item.subcategoria] || [];
      acc[item.categoria][item.subcategoria].push(item);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([categoria, subcats]) => {
      
      const catAccordion = document.createElement('button');
      catAccordion.className = 'accordion';
      catAccordion.textContent = categoria;
      
      const catPanel = document.createElement('div');
      catPanel.className = 'panel';

  const subcatsOrdenados = Object.entries(subcats).sort(([a], [b]) => {
  const keyA = a.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const keyB = b.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const nomeA = subLabelMap[keyA] || a;
  const nomeB = subLabelMap[keyB] || b;
    return subcategoriaOrdemFixa.indexOf(nomeA) - subcategoriaOrdemFixa.indexOf(nomeB);
  });

  subcatsOrdenados.forEach(([subcategoria, itemsList]) => {
        const subAccordion = document.createElement('button');
        subAccordion.className = 'accordion';
        subAccordion.style.marginLeft = '1rem';
  const normalizedSub = subcategoria.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const labelFinal = subLabelMap[normalizedSub] || '';
  subAccordion.textContent = subLabelMap[normalizedSub] || subcategoria;
        const subPanel = document.createElement('div');
        subPanel.className = 'panel';

        const ul = document.createElement('ul');
        ul.className = 'item-list';

        // Ordenação personalizada
  itemsList.sort((a, b) => {
    const getRank = item => {
      if (item.status === 'instalado') return 4;
      if (item.status === 'recolhido') return 3;
      if (item.status === 'disponivel' && item.tecnico) return 2;
      return 1; // disponível e sem técnico
    };
    return getRank(a) - getRank(b);
  });


  let currentShown = 20;

  function renderItemsList() {
    ul.innerHTML = ''; // limpa antes
    const visibleItems = itemsList.slice(0, currentShown);

    visibleItems.forEach(it => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = '✖';
      btn.className = 'delete-btn';
      btn.addEventListener('click', () => {
        const idx = items.findIndex(x => x.numeroSerie === it.numeroSerie);
        if (idx > -1) {
          items.splice(idx, 1);
          renderStock(searchInput.value.trim());
          renderTechInterface();
          renderInstalledList();
          renderPickupList();
        }
      });

      const span = document.createElement('span');
      let statusEmoji = '⚪';
      if (it.status === 'instalado') statusEmoji = '⚫';
      else if (it.status === 'recolhido') statusEmoji = '🟡';
      else if (it.status === 'disponivel' && it.tecnico) statusEmoji = '🟢';

  let tecnicoInfo = '';
  if (it.status === 'instalado') {
    tecnicoInfo += ' - Instalado';
  }
  if (it.tecnico) {
    tecnicoInfo += ` 👷‍♂️ ${it.tecnico}`;
  }
  span.textContent = `${statusEmoji} SN: ${it.numeroSerie}${tecnicoInfo}`;

      li.appendChild(btn);
      li.appendChild(span);
      ul.appendChild(li);
    });

    // Mostrar botão se ainda houver mais
    if (currentShown < itemsList.length) {
      const showMoreBtn = document.createElement('button');
      showMoreBtn.textContent = 'Mostrar mais...';
      showMoreBtn.style.marginTop = '0.5rem';
      showMoreBtn.style.backgroundColor = '#eee';
      showMoreBtn.style.border = '1px solid #ccc';
      showMoreBtn.style.padding = '4px 8px';
      showMoreBtn.style.cursor = 'pointer';
      showMoreBtn.addEventListener('click', () => {
        currentShown += 10;
        renderItemsList();
      });
      ul.appendChild(showMoreBtn);
    }
  }

  renderItemsList();


        subPanel.appendChild(ul);
        catPanel.appendChild(subAccordion);
        catPanel.appendChild(subPanel);
      });

      stockContent.appendChild(catAccordion);
      stockContent.appendChild(catPanel);
    });

    // Ativa comportamento dos accordions
    const acc = document.querySelectorAll('.accordion');
    acc.forEach(btn => {
      btn.addEventListener('click', function () {
        const panel = this.nextElementSibling;
        panel.classList.toggle('show');
      });
    });
  }

      // Render Tech interface
  function renderTechInterface() {
    const prevAssign = assignTech.value;
    const prevInstall = installTech.value;
    const prevPickup = pickupTech.value;

    techsList.innerHTML = '';
    assignTech.innerHTML = '<option value="">Selecione técnico...</option>';
    installTech.innerHTML = '<option value="">Selecione técnico...</option>';
    pickupTech.innerHTML = '<option value="">Selecione técnico...</option>';

    techs.forEach(t => {
      techsList.appendChild(Object.assign(document.createElement('li'), { textContent: t }));

      const optAssign = new Option(t, t);
      const optInstall = new Option(t, t);
      const optPickup = new Option(t, t);

      assignTech.appendChild(optAssign);
      installTech.appendChild(optInstall);
      pickupTech.appendChild(optPickup);
    });

    assignTech.value = prevAssign;
    installTech.value = prevInstall;
    pickupTech.value = prevPickup;

    assignments.innerHTML = '';

    const categoriaOrdemFixa = [
      "Router's",
      "Box's",
      "Extender's",
      "Telefones",
      "Cartão SIM",
      "ONT'S"
    ];

    techs.forEach(t => {
      const techItems = items.filter(i => i.tecnico === t)

      if (!techItems.length) return;

      const grouped = techItems.reduce((acc, item) => {
        acc[item.categoria] = acc[item.categoria] || {};
        acc[item.categoria][item.subcategoria] = acc[item.categoria][item.subcategoria] || [];
        acc[item.categoria][item.subcategoria].push(item);
        return acc;
      }, {});

      const techHeader = document.createElement('h4');
      techHeader.textContent = t;
      assignments.appendChild(techHeader);

      categoriaOrdemFixa.forEach(categoria => {
        const subcats = grouped[categoria];
        if (!subcats) return;

        const catAccordion = document.createElement('button');
        catAccordion.className = 'accordion';
        catAccordion.textContent = categoria;

        const catPanel = document.createElement('div');
        catPanel.className = 'panel';

        Object.entries(subcats).forEach(([subcategoria, list]) => {
          const subAccordion = document.createElement('button');
          subAccordion.className = 'accordion';
          subAccordion.style.marginLeft = '1rem';
          subAccordion.textContent = subcategoria;

          const subPanel = document.createElement('div');
          subPanel.className = 'panel';

          const ul = document.createElement('ul');
          ul.className = 'item-list';

          list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `SN: ${item.numeroSerie}`;
            ul.appendChild(li);
          });

          subPanel.appendChild(ul);
          catPanel.appendChild(subAccordion);
          catPanel.appendChild(subPanel);
        });

        assignments.appendChild(catAccordion);
        assignments.appendChild(catPanel);
      });
    });

    // Ativa accordions
    document.querySelectorAll('#assignments .accordion').forEach(btn => {
      btn.addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('show');
      });
    });
    const exportSelect = document.getElementById('export-select');
exportSelect.innerHTML = '<option value="">Selecione técnico...</option>';
techs.forEach(tech => {
  const opt = new Option(tech, tech);
  exportSelect.appendChild(opt);
});

  }

      function showView(v) {
    formContainer.style.display = v === 'form' ? 'block' : 'none';
    stockContainer.style.display = v === 'stock' ? 'block' : 'none';
    techsContainer.style.display = v === 'techs' ? 'block' : 'none';
    installForm.style.display = v === 'install' ? 'block' : 'none';
    pickupForm.style.display = v === 'pickup' ? 'block' : 'none';

    if (v === 'stock') renderStock(searchInput.value.trim());
    if (v === 'techs') renderTechInterface();
    if (v === 'install') renderInstalledList();
    if (v === 'pickup') renderPickupList();
  }


      // Events
      openFormBtn.addEventListener('click', e => { e.preventDefault(); showView('form'); });
      openStockBtn.addEventListener('click', e => { e.preventDefault(); showView('stock'); });
      openTechsBtn.addEventListener('click', e => { e.preventDefault(); showView('techs'); });

      categorySelect.addEventListener('change', updateSubcategories);
      searchInput.addEventListener('input', () => renderStock(searchInput.value.trim()));

form.addEventListener('submit', async e => {
  e.preventDefault();
  const sn = serialInput.value.trim();
  const categoria = categorySelect.value;
  const subcategoria = subcategorySelect.value;

  if (items.some(x => x.numeroSerie === sn)) return alert('Este número de série já está cadastrado no estoque.');

  const item = {
    categoria,
    subcategoria,
    numeroSerie: sn,
    status: 'disponivel',
    tecnico: null
  };

  items.push(item);
  serialInput.value = '';
  saveToLocalStorage();

  try {
    const { error } = await supabase.from('equipamentos').insert([item]);
    if (error) throw error;
    console.log('📡 Equipamento cadastrado na nuvem com sucesso.');
  } catch (err) {
    console.error('Erro ao salvar no Supabase:', err.message);
    alert('⚠️ Erro ao salvar no banco. Verifique a conexão.');
  }
});

addTechBtn.addEventListener('click', async () => {
  const n = techNameInput.value.trim();
  if (!n || techs.includes(n)) return;
  techs.push(n);
  techNameInput.value = '';
  renderTechInterface();
  renderInstalledList();
  renderPickupList();

  // ⬇️ Salva no Supabase
  try {
    const { error } = await supabase.from('tecnicos').upsert([{ nome: n }], { onConflict: 'nome' });
    if (error) throw error;
  } catch (err) {
    alert('Erro ao salvar técnico no banco.');
    console.error(err);
  }
});
      const openInstallBtn = document.getElementById('open-instalados');
  const openPickupBtn = document.getElementById('open-recolhas');

  openInstallBtn.addEventListener('click', e => {
    e.preventDefault();
    showView('install');
  });

  openPickupBtn.addEventListener('click', e => {
    e.preventDefault();
    showView('pickup');
  });


      // Assign with Enter key
assignSerial.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const tech = assignTech.value;
    const sn = assignSerial.value.trim();
    if (!tech || !sn) return;

    const item = items.find(i => i.numeroSerie === sn);

    if (!item) {
      alert('Este item não está no estoque.');
      return;
    }

    if (item.tecnico && item.tecnico !== tech) {
      const confirmar = confirm(`⚠️ O equipamento já está atribuído a ${item.tecnico}. Deseja transferi-lo para ${tech}?`);
      if (!confirmar) {
        assignSerial.value = '';
        return;
      }
    }

    item.tecnico = tech;

    // 🔥 Atualiza no Supabase
    const { error } = await supabase
      .from('equipamentos')
      .update({ tecnico: tech })
.eq('numero_serie', sn);

    if (error) {
      alert('Erro ao atualizar no banco de dados.');
      console.error(error);
    }

    assignSerial.value = '';
    renderTechInterface();
    renderStock();
  }
});


      // Instalar Equipamento
installSerial.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const tech = installTech.value;
    const sn = installSerial.value.trim();
    if (!tech || !sn) return;

    const item = items.find(i => i.numeroSerie === sn);
    if (!item) return alert('Este item não está no estoque.');

    if (item.status === 'recolhido') {
      return alert('Este equipamento já foi recolhido e não pode ser instalado.');
    }
    if (item.status === 'instalado') {
      return alert('Este equipamento já foi instalado.');
    }

    item.status = 'instalado';
    item.tecnico = tech;

    // 🔥 Atualiza no Supabase
    const { error } = await supabase
      .from('equipamentos')
      .update({ status: 'instalado', tecnico: tech })
      .eq('numero_serie', sn);

    if (error) {
      alert('Erro ao atualizar instalação no banco.');
      console.error(error);
    }

    installSerial.value = '';
    renderStock();
    renderTechInterface();
    renderInstalledList();
  }
});



      // Recolher Equipamento
pickupSerial.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const tech = pickupTech.value;
    const sn = pickupSerial.value.trim();
    const cat = document.getElementById('pickup-category').value || 'Recolha';
    const sub = document.getElementById('pickup-subcategory').value || 'Desconhecido';

    if (!tech || !sn) return;

    let item = items.find(i => i.numeroSerie === sn);

    if (!item) {
      item = {
        numeroSerie: sn,
        categoria: cat,
        subcategoria: sub,
        status: 'recolhido',
        tecnico: tech
      };
      items.push(item);

      // ⬇️ Inserção no banco se não existia
      const { error } = await supabase
        .from('equipamentos')
        .insert([item]);

      if (error) {
        alert('Erro ao salvar recolha no banco.');
        console.error(error);
      }
    } else {
      if (item.status === 'instalado') {
        return alert('Este equipamento já foi instalado e não pode ser recolhido.');
      }
      if (item.status === 'recolhido') {
        return alert('Este equipamento já foi recolhido.');
      }

      item.status = 'recolhido';
      item.tecnico = tech;

      // ⬇️ Atualização no banco se já existia
      const { error } = await supabase
        .from('equipamentos')
        .update({ status: 'recolhido', tecnico: tech })
        .eq('numero_serie', sn);

      if (error) {
        alert('Erro ao atualizar recolha no banco.');
        console.error(error);
      }
    }

    pickupSerial.value = '';
    renderStock();
    renderTechInterface();
    renderPickupList();
  }
});
// 💾 Funções para salvar/carregar localStorage




      // Init
(async function init() {
  await carregarTecnicosDoSupabase();
  await carregarDoSupabase();
  populateCategories();
  populatePickupCategories();
  renderTechInterface();
  showView(null);
})();



  function renderInstalledList() {
    const container = document.getElementById('installed-list');
    container.innerHTML = '';

    const grouped = techs.reduce((acc, tech) => {
      const techItems = items.filter(i => i.tecnico === tech && i.status === 'instalado');
      if (techItems.length) {
        acc[tech] = techItems.reduce((accCat, item) => {
          accCat[item.categoria] = accCat[item.categoria] || {};
          accCat[item.categoria][item.subcategoria] = accCat[item.categoria][item.subcategoria] || [];
          accCat[item.categoria][item.subcategoria].push(item);
          return accCat;
        }, {});
      }
      return acc;
    }, {});

    const categoriaOrdemFixa = [
      "Router's",
      "Box's",
      "Extender's",
      "Telefones",
      "Cartão SIM",
      "ONT'S"
    ];

    Object.entries(grouped).forEach(([tech, categorias]) => {
      const techHeader = document.createElement('h4');
      techHeader.textContent = tech;
      container.appendChild(techHeader);

      categoriaOrdemFixa.forEach(categoria => {
        const subcats = categorias[categoria];
        if (!subcats) return;

        const catAccordion = document.createElement('button');
        catAccordion.className = 'accordion';
        catAccordion.textContent = categoria;

        const catPanel = document.createElement('div');
        catPanel.className = 'panel';

        Object.entries(subcats).forEach(([subcategoria, list]) => {
          const subAccordion = document.createElement('button');
          subAccordion.className = 'accordion';
          subAccordion.style.marginLeft = '1rem';
          subAccordion.textContent = subcategoria;

          const subPanel = document.createElement('div');
          subPanel.className = 'panel';

          const ul = document.createElement('ul');
          ul.className = 'item-list';

          list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `SN: ${item.numeroSerie}`;
            ul.appendChild(li);
          });

          subPanel.appendChild(ul);
          catPanel.appendChild(subAccordion);
          catPanel.appendChild(subPanel);
        });

        container.appendChild(catAccordion);
        container.appendChild(catPanel);
      });
    });

    // Ativa accordions
    document.querySelectorAll('#installed-list .accordion').forEach(btn => {
      btn.addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('show');
      });
    });
  }

  function renderPickupList() {
    const container = document.getElementById('pickup-list');
    container.innerHTML = '';

    const grouped = techs.reduce((acc, tech) => {
      const techItems = items.filter(i => i.tecnico === tech && i.status === 'recolhido');
      if (techItems.length) acc[tech] = techItems;
      return acc;
    }, {});

    Object.entries(grouped).forEach(([tech, list]) => {
      const section = document.createElement('div');
      section.innerHTML = `<h4>${tech}</h4>`;
      list.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `SN: ${item.numeroSerie} - ${item.categoria} / ${item.subcategoria}`;
        section.appendChild(p);
      });
      container.appendChild(section);
    });
  }
  let selectedFile = null;

  document.getElementById('xlsx-upload').addEventListener('change', function (event) {
    selectedFile = event.target.files[0];
  });

  // Detecta mudança no input file e salva o arquivo
  document.getElementById('xlsx-upload').addEventListener('change', function (event) {
    selectedFile = event.target.files[0];
    console.log('📂 Arquivo selecionado:', selectedFile?.name);
  });

  // Clique no botão Importar
  document.getElementById('btn-importar').addEventListener('click', function () {
    if (!selectedFile) {
      alert('Nenhum arquivo selecionado!');
      return;
    }

    const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log('📥 Linhas importadas:', rows.length);

(async () => {
  for (const [i, row] of rows.slice(1).entries()) {
    const numeroSerie = row[5]?.toString().trim().substring(1);
    const subcategoria = row[7]?.toString().trim();
    if (!numeroSerie || !subcategoria) continue;

    const temStatus = !!row[1];
    const nomeTecnicoBruto = row[4]?.toString().trim();
    let status = temStatus ? 'instalado' : 'disponivel';
    let tecnico = nomeTecnicoBruto ? nomeTecnicoBruto.split(' ')[0] : '';

    // Detecta categoria
    const subcatNorm = subcategoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    let categoria = 'Outros';
    if (subcatNorm.includes('box') || subcatNorm.includes('dta')) categoria = "Box's";
    else if (subcatNorm.includes('router')) categoria = "Router's";
    else if (subcatNorm.includes('extender')) categoria = "Extender's";
    else if (subcatNorm.includes('cartao') || subcatNorm.includes('sim')) categoria = "Cartão SIM";
    else if (subcatNorm.includes('ont')) categoria = "ONT'S";
    else if (subcatNorm.includes('telefone') || subcatNorm.includes('voip')) categoria = "Telefones";

    if (!categories[categoria]) categories[categoria] = [];
    if (!categories[categoria].includes(subcategoria)) {
      categories[categoria].push(subcategoria);
    }

    // Atualiza local (para interface funcionar)
    const existingItem = items.find(item => item.numeroSerie === numeroSerie);
    if (existingItem) {
      existingItem.categoria = categoria;
      existingItem.subcategoria = subcategoria;
      if (existingItem.status === 'disponivel') {
        existingItem.status = status;
        existingItem.tecnico = tecnico;
      }
    } else {
      items.push({ categoria, subcategoria, numeroSerie, status, tecnico });
    }

    // Salva no Supabase 🧠
    await supabase.from('equipamentos').upsert({
      categoria,
      subcategoria,
      numero_serie: numeroSerie,
      status,
      tecnico
    }, { onConflict: 'numero_serie' });

  }

  // Atualiza UI
  populateCategories();
  updateSubcategories();
  renderStock(searchInput.value.trim());
  renderTechInterface();
  alert('✅ Importação finalizada com sucesso!');
})();




    // Atualizações visuais pós-importação
    populateCategories();
    updateSubcategories();
    renderStock(searchInput.value.trim());
    renderTechInterface();
    alert('✅ Importação finalizada com sucesso!');
  };



    reader.readAsArrayBuffer(selectedFile);
  });

  // 🧨 Reset total da aplicação (limpa memória e reinicia)
document.getElementById('reset-app').addEventListener('click', () => {
  if (confirm('⚠️ Isso apagará todos os dados carregados/importados. Deseja continuar?')) {
    location.reload();
  }
});

document.getElementById('btn-exportar').addEventListener('click', () => {
  const selectedTech = document.getElementById('export-select').value;
  if (!selectedTech) {
    alert('Selecione um técnico.');
    return;
  }

  const exportados = items.filter(i => i.tecnico === selectedTech && i.status === 'disponivel');

  if (exportados.length === 0) {
    alert(`Nenhum equipamento atribuído para ${selectedTech} que ainda não foi instalado.`);
    return;
  }

  const data = exportados.map(item => ({
    'Número de Série': item.numeroSerie,
    'Categoria': item.categoria,
    'Subcategoria': item.subcategoria,
    'Status': item.status,
    'Técnico': item.tecnico
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Equipamentos');

  XLSX.writeFile(wb, `atribuidos_${selectedTech}.xlsx`);
});



