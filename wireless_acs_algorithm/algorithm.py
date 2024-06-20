
# Ratio of observed busy time compared over time spend on channel
def calc_busy_ratio(busy_time, rx_time, active_time, tx_time, busy_time_unavailable): 
    if busy_time_unavailable:
        x = rx_time - tx_time
    else:
        x = busy_time - tx_time
    y = active_time - tx_time
    ratio = x / y
    return ratio



def convert_dbm_to_watts(dBm):
    watts = 10**(dBm/10)
    return watts

def calc_nf_diff(channel_nf, band_min_nf):
    nf_diff = channel_nf - band_min_nf
    return nf_diff

def calc_nf_combined(channel_nf, band_min_nf):
    nf_combined = convert_dbm_to_watts(channel_nf) + convert_dbm_to_watts(band_min_nf)
    return nf_combined




# Simple channel interference factor (SCIF). (Use in the case of no combined channel interference (e.g HT40 uses two channels so cannot use simple SIF))
def SCIF(busy_ratio, nf_diff):
    if nf_diff == 0:
        SIF = busy_ratio
    else:
        SIF = busy_ratio * 2**(nf_diff)
    return SIF



# Combined channel interference factor (CCIF). (Use in the case where multiple channels are used).
def CCIF(busy_ratio, nf_combined):
    CCIF = busy_ratio * 2**(nf_combined)     
    return CCIF



# Combined channel interference factor zero (CCIFZ). (Use in the case where both busy_time and rx_time are 0, i.e no channel load)
def CCIFZ(channel_nf):
    CCIFZ = 10**(channel_nf/5)
    return CCIFZ


