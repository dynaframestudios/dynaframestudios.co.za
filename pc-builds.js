/* =========================================================
   PROJECT TITAN — PC BUILDS PAGE INTERACTIVITY
   ---------------------------------------------------------
   1. Custom Builder (purpose / resolution / budget / CPU / GPU)
   2. Performance Lab counters (count-up on scroll)
   3. Build Journey progress bar
   4. Titan Intelligence AI questionnaire
   5. Titan Observatory game genre filter
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       HELPERS
    ===================================================== */
    function formatZAR(value) {
        return 'R' + Math.round(value).toLocaleString('en-ZA');
    }

    function singleSelect(group, activeClass) {
        // group: NodeList of buttons. Returns the clicked button's dataset via callback.
        group.forEach(function (btn) {
            btn.addEventListener('click', function () {
                group.forEach(function (b) { b.classList.remove(activeClass); });
                btn.classList.add(activeClass);
                btn.dispatchEvent(new CustomEvent('titan:selected', { bubbles: true }));
            });
        });
    }

    /* =====================================================
       1. CUSTOM BUILDER
    ===================================================== */
    (function initCustomBuilder() {
        var builder = document.getElementById('custom-builder');
        if (!builder) return;

        var purposeButtons = builder.querySelectorAll('#purposeGrid .titan-builder-card');
        var resolutionButtons = builder.querySelectorAll('#resolutionGrid .titan-builder-card');
        var budgetSlider = document.getElementById('budgetSlider');
        var budgetValueEl = document.getElementById('budgetValue');
        var cpuRadios = builder.querySelectorAll('input[name="cpu"]');
        var gpuRadios = builder.querySelectorAll('input[name="gpu"]');

        var summaryPurpose = document.getElementById('summaryPurpose');
        var summaryResolution = document.getElementById('summaryResolution');
        var summaryPrice = document.getElementById('summaryPrice');
        var summaryFPS = document.getElementById('summaryFPS');
        var summaryPSU = document.getElementById('summaryPSU');
        var summaryCooling = document.getElementById('summaryCooling');
        var meterFill = document.getElementById('meterFill');
        var requestBuildBtn = document.getElementById('requestBuildBtn');

        // Give the meter a working look even without dedicated CSS in place yet.
        if (meterFill) {
            var meterTrack = meterFill.parentElement;
            if (meterTrack) {
                meterTrack.style.position = 'relative';
                meterTrack.style.background = 'rgba(255,255,255,.08)';
                meterTrack.style.borderRadius = '999px';
                meterTrack.style.overflow = 'hidden';
                meterTrack.style.height = meterTrack.style.height || '34px';
            }
            meterFill.style.height = '100%';
            meterFill.style.display = 'flex';
            meterFill.style.alignItems = 'center';
            meterFill.style.justifyContent = 'flex-end';
            meterFill.style.padding = '0 12px';
            meterFill.style.fontWeight = '800';
            meterFill.style.color = '#fff';
            meterFill.style.background = 'linear-gradient(90deg, var(--titan-brand,#ff6b00), var(--titan-cyan,#00eaff))';
            meterFill.style.transition = 'width .5s ease';
            meterFill.style.whiteSpace = 'nowrap';
        }

        function getActiveValue(buttons, fallbackAttr) {
            var active = Array.prototype.find.call(buttons, function (b) { return b.classList.contains('active'); });
            return active ? active.dataset : null;
        }

        function getCheckedRadio(radios) {
            return Array.prototype.find.call(radios, function (r) { return r.checked; }) || radios[0];
        }

        function recalculate() {
            var purposeData = getActiveValue(purposeButtons) || { value: 'Gaming', perf: '1' };
            var resolutionData = getActiveValue(resolutionButtons) || { value: '1080P', mult: '1' };
            var cpu = getCheckedRadio(cpuRadios);
            var gpu = getCheckedRadio(gpuRadios);
            var budget = budgetSlider ? parseInt(budgetSlider.value, 10) : 25000;

            // Live budget display
            if (budgetValueEl) budgetValueEl.textContent = formatZAR(budget);

            // Summary: purpose / resolution / price
            if (summaryPurpose) summaryPurpose.textContent = purposeData.value;
            if (summaryResolution) summaryResolution.textContent = resolutionData.value;
            if (summaryPrice) summaryPrice.textContent = formatZAR(budget);

            // Performance score = blend of CPU + GPU scores, nudged by purpose relevance
            var cpuScore = cpu ? parseFloat(cpu.dataset.score || 60) : 60;
            var gpuScore = gpu ? parseFloat(gpu.dataset.score || 60) : 60;
            var perfWeight = parseFloat(purposeData.perf || 1);
            var rawScore = (cpuScore * 0.45 + gpuScore * 0.55) * (0.8 + perfWeight * 0.2);
            var score = Math.max(15, Math.min(100, Math.round(rawScore)));

            if (meterFill) {
                meterFill.style.width = score + '%';
                meterFill.textContent = score + '%';
            }

            // Estimated FPS = GPU baseline FPS scaled by resolution multiplier & purpose
            var gpuFps = gpu ? parseFloat(gpu.dataset.fps || 100) : 100;
            var resMult = parseFloat(resolutionData.mult || 1);
            var estFps = Math.round(gpuFps * resMult * (0.85 + perfWeight * 0.15));
            if (summaryFPS) summaryFPS.textContent = estFps + ' FPS';

            // Recommended PSU straight from GPU data
            if (summaryPSU) summaryPSU.textContent = gpu ? (gpu.dataset.psu || '650W Bronze') : '650W Bronze';

            // Cooling recommendation based on combined CPU/GPU intensity
            var coolingLabel = 'Stock Air Cooler';
            if (score >= 90) coolingLabel = 'Custom Loop Liquid Cooling';
            else if (score >= 75) coolingLabel = '360mm AIO';
            else if (score >= 55) coolingLabel = '240mm AIO';
            if (summaryCooling) summaryCooling.textContent = coolingLabel;

            // Keep the "Request This Build" link pre-filled with the current configuration
            if (requestBuildBtn) {
                var params = new URLSearchParams({
                    service: 'pc-build',
                    purpose: purposeData.value,
                    resolution: resolutionData.value,
                    budget: budget,
                    cpu: cpu ? cpu.value : '',
                    gpu: gpu ? gpu.value : '',
                    fps: estFps,
                    psu: summaryPSU ? summaryPSU.textContent : '',
                    cooling: coolingLabel
                });
                requestBuildBtn.href = 'contact.html?' + params.toString();
            }
        }

        singleSelect(purposeButtons, 'active');
        singleSelect(resolutionButtons, 'active');

        purposeButtons.forEach(function (b) { b.addEventListener('titan:selected', recalculate); });
        resolutionButtons.forEach(function (b) { b.addEventListener('titan:selected', recalculate); });
        cpuRadios.forEach(function (r) { r.addEventListener('change', recalculate); });
        gpuRadios.forEach(function (r) { r.addEventListener('change', recalculate); });
        if (budgetSlider) budgetSlider.addEventListener('input', recalculate);

        recalculate();
    })();

    /* =====================================================
       2. PERFORMANCE LAB COUNTERS (count up on scroll)
    ===================================================== */
    (function initCounters() {
        var counters = document.querySelectorAll('.performance-overview .counter');
        if (!counters.length) return;

        function animateCounter(el) {
            var raw = el.textContent.trim();
            var match = raw.match(/-?\d+(\.\d+)?/);
            if (!match) return;

            var target = parseFloat(match[0]);
            var prefix = raw.slice(0, match.index);
            var suffix = raw.slice(match.index + match[0].length);
            var isDecimal = match[0].indexOf('.') !== -1;
            var duration = 1400;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = target * eased;
                el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = raw;
                }
            }
            requestAnimationFrame(step);
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(function (c) { observer.observe(c); });
    })();

    /* =====================================================
       3. BUILD JOURNEY PROGRESS BAR
    ===================================================== */
    (function initProgressBar() {
        var fills = document.querySelectorAll('.progress-fill');
        if (!fills.length) return;

        fills.forEach(function (fill) {
            var raw = fill.textContent.trim();
            var match = raw.match(/\d+(\.\d+)?/);
            var pct = match ? match[0] : '0';

            var bar = fill.parentElement;
            if (bar) {
                bar.style.position = 'relative';
                bar.style.background = 'rgba(255,255,255,.08)';
                bar.style.borderRadius = '999px';
                bar.style.overflow = 'hidden';
                bar.style.height = bar.style.height || '28px';
            }
            fill.style.height = '100%';
            fill.style.width = '0%';
            fill.style.display = 'flex';
            fill.style.alignItems = 'center';
            fill.style.justifyContent = 'flex-end';
            fill.style.padding = '0 12px';
            fill.style.color = '#fff';
            fill.style.fontWeight = '700';
            fill.style.fontSize = '.85rem';
            fill.style.background = 'linear-gradient(90deg, var(--titan-brand,#ff6b00), var(--titan-cyan,#00eaff))';
            fill.style.transition = 'width 1.2s ease';
            fill.style.whiteSpace = 'nowrap';

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(function () {
                            fill.style.width = pct + '%';
                            fill.textContent = pct + '%';
                        });
                        observer.unobserve(fill);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(fill);
        });
    })();

    /* =====================================================
       4. TITAN INTELLIGENCE — AI QUESTIONNAIRE
    ===================================================== */
    (function initAIQuestionnaire() {
        var form = document.getElementById('aiQuestionnaire');
        var generateBtn = document.getElementById('generateRecommendationBtn');
        if (!form || !generateBtn) return;

        var budgetSlider = document.getElementById('aiBudgetSlider');
        var budgetValueEl = document.getElementById('aiBudgetValue');
        var hint = document.getElementById('aiQuestionnaireHint');
        var resultsSection = document.getElementById('aiResults');

        var resultTitleEl = document.getElementById('aiResultTitle');
        var confidenceEl = document.getElementById('aiConfidence');
        var fpsListEl = document.getElementById('aiFpsList');
        var pairingListEl = document.getElementById('aiPairingList');
        var upgradeListEl = document.getElementById('aiUpgradeList');

        if (budgetSlider) {
            budgetSlider.addEventListener('input', function () {
                if (budgetValueEl) budgetValueEl.textContent = 'Selected: ' + formatZAR(budgetSlider.value);
            });
        }

        // Fade the results in gently until the person generates their own recommendation
        if (resultsSection) {
            resultsSection.style.opacity = '0.45';
            resultsSection.style.filter = 'grayscale(40%)';
            resultsSection.style.transition = 'opacity .5s ease, filter .5s ease';
        }

        var editionMap = {
            'Competitive Gaming': 'TITAN Strike Edition',
            'AAA Gaming': 'TITAN Black Edition',
            'Content Creation': 'TITAN Creator Edition',
            'Software Development': 'TITAN Dev Edition',
            'AI / Machine Learning': 'TITAN Compute Edition',
            'Professional Workstation': 'TITAN Workstation Edition'
        };

        var pairingMap = {
            'Competitive Gaming': ['360Hz Esports Monitor', 'Low-Latency Mechanical Keyboard', 'Lightweight Wireless Mouse', 'Competitive Gaming Headset'],
            'AAA Gaming': ['27" 240Hz Monitor', 'Mechanical Keyboard', 'Wireless Mouse', 'Studio Headset'],
            'Content Creation': ['4K Colour-Accurate Monitor', 'Drawing Tablet', 'Studio Microphone', 'Fast External SSD'],
            'Software Development': ['Dual 27" 1440P Monitors', 'Ergonomic Keyboard', 'Precision Mouse', 'Noise-Cancelling Headset'],
            'AI / Machine Learning': ['Dual Monitor Setup', 'High-Capacity NVMe Storage', 'UPS Backup Power', 'Extra System RAM'],
            'Professional Workstation': ['Dual 4K Monitors', 'Ergonomic Keyboard & Mouse', 'Colour Calibration Tool', 'Docking Station']
        };

        function currentAnswers() {
            var purpose = form.querySelector('input[name="ai-purpose"]:checked');
            var resolution = form.querySelector('input[name="ai-resolution"]:checked');
            var style = form.querySelector('input[name="ai-style"]:checked');
            var budget = budgetSlider ? parseInt(budgetSlider.value, 10) : 20000;
            return {
                purpose: purpose ? purpose.value : null,
                resolution: resolution ? resolution.value : null,
                style: style ? style.value : null,
                budget: budget
            };
        }

        function fpsMultiplierFor(resolution) {
            switch (resolution) {
                case '1080P': return 1.4;
                case '1440P': return 1;
                case '4K': return 0.55;
                case 'Ultrawide': return 0.85;
                default: return 1;
            }
        }

        function budgetTierScore(budget) {
            // 8000 -> ~30, 100000 -> ~99
            return Math.round(30 + (Math.min(budget, 100000) - 8000) / (100000 - 8000) * 69);
        }

        generateBtn.addEventListener('click', function () {
            var answers = currentAnswers();
            var answeredCount = ['purpose', 'resolution', 'style'].filter(function (k) { return answers[k]; }).length;

            if (answeredCount === 0) {
                if (hint) {
                    hint.textContent = 'Pick at least one answer above so we can tailor a recommendation.';
                    hint.style.color = 'var(--titan-red, #ff4d5e)';
                }
                return;
            }

            var purpose = answers.purpose || 'AAA Gaming';
            var resolution = answers.resolution || '1440P';
            var budgetScore = budgetTierScore(answers.budget);
            var confidence = Math.min(99, 55 + answeredCount * 10 + Math.round(budgetScore * 0.15));

            var baseFps = 90 + Math.round(budgetScore * 2.1);
            var mult = fpsMultiplierFor(resolution);
            var games = [
                { name: 'Valorant', factor: 2.6 },
                { name: 'CS2', factor: 2.2 },
                { name: 'Cyberpunk 2077', factor: 0.85 },
                { name: 'Forza Horizon', factor: 1.15 }
            ];

            if (resultTitleEl) resultTitleEl.textContent = editionMap[purpose] || 'TITAN Custom Edition';
            if (confidenceEl) confidenceEl.textContent = confidence + '%';

            if (fpsListEl) {
                fpsListEl.innerHTML = games.map(function (g) {
                    var fps = Math.max(45, Math.round(baseFps * mult * g.factor));
                    return '<li>' + g.name + ' — ' + fps + '+</li>';
                }).join('');
            }

            if (pairingListEl) {
                var pairing = pairingMap[purpose] || pairingMap['AAA Gaming'];
                pairingListEl.innerHTML = pairing.map(function (item) { return '<li>' + item + '</li>'; }).join('');
            }

            if (upgradeListEl) {
                var upgrades = ['Memory Expansion', 'Additional NVMe SSD'];
                upgrades.push(budgetScore < 60 ? 'GPU Upgrade Path' : 'Custom Water Cooling');
                upgrades.push('Future GPU Ready');
                upgradeListEl.innerHTML = upgrades.map(function (item) { return '<li>' + item + '</li>'; }).join('');
            }

            if (resultsSection) {
                resultsSection.style.opacity = '1';
                resultsSection.style.filter = 'none';
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            if (hint) {
                hint.style.color = '';
                hint.textContent = 'Recommendation generated from ' + answeredCount + ' of 3 answers — add more for a sharper match.';
            }
        });
    })();

    /* =====================================================
       5. TITAN OBSERVATORY — GAME GENRE FILTER
    ===================================================== */
    (function initGameFilter() {
        var genreGroup = document.getElementById('genreFilterGroup');
        var resolutionGroup = document.getElementById('resolutionFilterGroup');
        var library = document.getElementById('gameLibrary');
        if (!genreGroup || !library) return;

        var genreButtons = genreGroup.querySelectorAll('button');
        var resolutionButtons = resolutionGroup ? resolutionGroup.querySelectorAll('button') : [];
        var cards = library.querySelectorAll('.game-card');

        function applyFilter(genre) {
            cards.forEach(function (card) {
                if (genre === 'All') {
                    card.style.display = '';
                    return;
                }
                var tags = Array.prototype.map.call(card.querySelectorAll('.game-tags span'), function (t) {
                    return t.textContent.trim().toLowerCase();
                });
                var matches = tags.indexOf(genre.toLowerCase()) !== -1;
                card.style.display = matches ? '' : 'none';
            });
        }

        genreButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                genreButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                applyFilter(btn.dataset.genre || 'All');
            });
        });

        // Resolution filter is a visual preference toggle only — the library
        // doesn't carry per-resolution benchmark data to filter against.
        resolutionButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                resolutionButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    })();

    /* =====================================================
       6. TITAN VAULT — 7-TAP LOGO EASTER EGG
    ===================================================== */
    (function initTitanVault() {
        var logo = document.getElementById('dynaframeLogo');
        var vault = document.getElementById('titan-vault');
        if (!logo || !vault) return;

        var REQUIRED_TAPS = 7;
        var TAP_WINDOW = 700; // ms of inactivity before a stray tap navigates normally
        var tapCount = 0;
        var tapTimer = null;

        function pulseLogo() {
            logo.style.transition = 'transform .15s ease';
            logo.style.transform = 'scale(1.12)';
            setTimeout(function () { logo.style.transform = 'scale(1)'; }, 150);
        }

        function unlockVault() {
            vault.style.display = 'block';
            vault.classList.add('active');
            vault.setAttribute('aria-hidden', 'false');
            vault.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        logo.addEventListener('click', function (e) {
            e.preventDefault();
            tapCount++;
            pulseLogo();

            if (tapTimer) clearTimeout(tapTimer);

            if (tapCount >= REQUIRED_TAPS) {
                tapCount = 0;
                unlockVault();
                return;
            }

            var href = logo.getAttribute('href');
            tapTimer = setTimeout(function () {
                // No 7th tap arrived in time — treat it as a normal click and navigate.
                if (tapCount === 1) {
                    window.location.href = href;
                }
                tapCount = 0;
            }, TAP_WINDOW);
        });

        /* -------------------------------------------------
           DEVELOPER CONSOLE COMMANDS
        -------------------------------------------------- */
        var input = document.getElementById('vaultCommandInput');
        var output = document.getElementById('vaultCommandOutput');
        if (!input || !output) return;

        function printLine(text, cls) {
            var line = document.createElement('div');
            line.className = 'line' + (cls ? ' ' + cls : '');
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }

        var commands = {
            help: function () {
                printLine('Available commands: help, version, roadmap, credits, clear, exit');
            },
            version: function () {
                printLine('DYNAFRAME STUDIOS BIOS v1.0.0 — Project Titan');
            },
            roadmap: function () {
                var phases = Array.prototype.map.call(
                    vault.querySelectorAll('.roadmap-phase h3'),
                    function (h) { return h.textContent.trim(); }
                );
                printLine('Roadmap: ' + phases.join(' -> '));
            },
            credits: function () {
                printLine('Project Titan — designed, imagined and engineered by Dynaframe Studios.');
            },
            clear: function () {
                output.innerHTML = '';
            },
            exit: function () {
                printLine('Closing Titan Vault...');
                setTimeout(function () {
                    vault.classList.remove('active');
                    vault.setAttribute('aria-hidden', 'true');
                    vault.style.display = 'none';
                    output.innerHTML = '';
                }, 400);
            }
        };

        input.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter') return;
            var raw = input.value.trim();
            if (!raw) return;

            printLine('titan@dynaframe:~$ ' + raw, 'echo');
            var cmd = raw.toLowerCase();

            if (commands[cmd]) {
                commands[cmd]();
            } else {
                printLine('Command not recognised: "' + raw + '" — type "help" for a list of commands.', 'error');
            }
            input.value = '';
        });

        printLine('Type "help" to see available commands.');
    })();

});
