<?php
// Resolve the IP address of the host submitted via query string
$host = trim($_GET['host'] ?? '');
$ip = null;
$error = null;

if ($host !== '') {
    if (!filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) {
        $error = 'Host inválido. Use um formato como google.com.';
    } else {
        $resolved = gethostbyname($host);

        // gethostbyname returns the input unchanged when resolution fails
        if ($resolved === $host) {
            $error = 'Não foi possível resolver o host "' . $host . '".';
        } else {
            $ip = $resolved;
        }
    }
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
    <main class="page__main">
        <section class="lookup">
            <div class="lookup__container">
                <div class="lookup__content">
                    <h1 class="lookup__title">Consultar IP do host</h1>
                    <form class="lookup__form" method="get">
                        <label class="lookup__label" for="host">Host</label>
                        <div class="lookup__row">
                            <input
                                class="lookup__input"
                                id="host"
                                name="host"
                                type="text"
                                placeholder="google.com"
                                value="<?= e($host) ?>"
                                autocomplete="off"
                                required>
                            <button class="lookup__button" type="submit">Consultar</button>
                        </div>
                    </form>
                    <?php if ($ip !== null): ?>
                        <p class="lookup__result">
                            O IP do host "<?= e($host) ?>" é: <strong class="lookup__ip"><?= e($ip) ?></strong>
                        </p>
                    <?php elseif ($error !== null): ?>
                        <p class="lookup__result lookup__result--error" role="alert"><?= e($error) ?></p>
                    <?php endif; ?>
                </div>
            </div>
        </section>
    </main>
