// find the dropdown and the area where results will appear
const selector = document.getElementById('scientist-selector');
const display = document.getElementById('results-display');

async function fetchScientists() {
    selector.disabled = true;

    try {
        const response = await fetch('data/scientists.json');

        // fetch does not throw an error for a missing file, so check the response
        if (!response.ok) {
            throw new Error('Could not load the scientist registry.');
        }

        // turn the json response into an array 
        const scientists = await response.json();
        selector.innerHTML = '<option value="">-- Select a research director --</option>';

        for (const scientist of scientists) {
            const option = document.createElement('option');
            option.value = scientist.id;
            option.textContent = scientist.name + ' - ' + scientist.specialty;
            selector.appendChild(option);
        }

        selector.disabled = false;
    } catch (error) {
        console.error('Stream 1 failed:', error);
        selector.innerHTML = '<option value="">Error loading scientists</option>';
    }
}

function simulateNetworkLag(ms) {
    // the promise lets us use await to wait until the timer finishes
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

async function fetchMetricsForScientist(scientistId) {
    // prevent overlapping requests while the selected scientist's records load
    selector.disabled = true;

    try {
        display.innerHTML = `
            <div class="d-flex flex-column align-items-center">
                <div class="spinner-border text-success mb-2" role="status"></div>
                <span class="text-muted small">Accessing cloud telemetry database... Please wait...</span>
            </div>
        `;

        // pause this function for one second without freezing the page
        await simulateNetworkLag(1000);

        const response = await fetch('data/metrics.json');

        if (!response.ok) {
            throw new Error('Could not load climate telemetry.');
        }

        const metrics = await response.json();
        const scientistMetrics = [];

        // keep only the records that belong to the selected scientist
        for (const metric of metrics) {
            if (metric.scientistId === scientistId) {
                scientistMetrics.push(metric);
            }
        }

        display.innerHTML = '';

        if (scientistMetrics.length === 0) {
            display.textContent = 'No climate telemetry records found for this scientist.';
            return;
        }

        const list = document.createElement('ul');
        list.className = 'list-group text-start';

        for (const metric of scientistMetrics) {
            const item = document.createElement('li');
            item.className = 'list-group-item';

            const region = document.createElement('h2');
            region.className = 'h6';
            region.textContent = metric.region;

            const offset = document.createElement('p');
            offset.className = 'metric-badge text-success mb-1';
            offset.textContent = 'Carbon offset: ' + metric.offsetTons + ' tons';

            const confidence = document.createElement('p');
            confidence.className = 'mb-0';
            confidence.textContent = 'Confidence: ' + metric.confidenceIndex;

            item.appendChild(region);
            item.appendChild(offset);
            item.appendChild(confidence);
            list.appendChild(item);
        }

        display.appendChild(list);
    } catch (error) {
        console.error('Stream 2 failed:', error);
        display.innerHTML = '';

        const message = document.createElement('div');
        message.className = 'alert alert-danger mb-0';
        message.textContent = 'Error fetching climate telemetry: ' + error.message;
        display.appendChild(message);
    } finally {
        // this runs after success, an empty result, or an error
        selector.disabled = false;
    }
}

selector.addEventListener('change', function (event) {
    const selectedId = event.target.value;

    if (!selectedId) {
        display.innerHTML = '<p class="text-muted mb-0">Please select a research director from the registry above.</p>';
        return;
    }

    fetchMetricsForScientist(selectedId);
});

fetchScientists();
