// Resolve a host's IPv4 address via Google DNS-over-HTTPS
const HOSTNAME_PATTERN = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const DNS_ENDPOINT = 'https://dns.google/resolve';
const DNS_TYPE_A = 1;

const form = document.querySelector('.lookup__form');
const input = document.querySelector('.lookup__input');
const result = document.querySelector('.lookup__result');

function showError(message) {
    result.classList.add('lookup__result--error');
    result.textContent = message;
    result.hidden = false;
}

function showIp(host, ip) {
    const ipElement = document.createElement('strong');
    ipElement.className = 'lookup__ip';
    ipElement.textContent = ip;

    result.classList.remove('lookup__result--error');
    result.textContent = 'O IP do host "' + host + '" é: ';
    result.append(ipElement);
    result.hidden = false;
}

async function lookup(host) {
    if (!HOSTNAME_PATTERN.test(host)) {
        showError('Host inválido. Use um formato como google.com.');
        return;
    }

    try {
        const response = await fetch(DNS_ENDPOINT + '?name=' + encodeURIComponent(host) + '&type=A');
        const data = await response.json();
        const record = (data.Answer || []).find((answer) => answer.type === DNS_TYPE_A);

        if (record) {
            showIp(host, record.data);
        } else {
            showError('Não foi possível resolver o host "' + host + '".');
        }
    } catch (error) {
        showError('Erro de rede ao consultar o host. Tente novamente.');
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const host = input.value.trim();
    history.replaceState(null, '', '?host=' + encodeURIComponent(host));
    lookup(host);
});

const initialHost = new URLSearchParams(location.search).get('host');

if (initialHost) {
    input.value = initialHost.trim();
    lookup(input.value);
}
