from algorithm import *



def test_calc_SCIF(expected_result, busy_time, rx_time, active_time, tx_time, busy_time_unavailable, channel_nf, band_min_nf):
    busy_ratio = calc_busy_ratio(busy_time, rx_time, active_time, tx_time, busy_time_unavailable)
    nf_diff = calc_nf_diff(channel_nf, band_min_nf)
    scif = round(SCIF(busy_ratio, nf_diff),7)
    print("scif", scif)
    print("expected", expected_result)
    assert scif == expected_result



def test_calc_CCIF(expected_result, busy_time, rx_time, active_time, tx_time, busy_time_unavailable, channel_nf, band_min_nf):
    busy_ratio = calc_busy_ratio(busy_time, rx_time, active_time, tx_time, busy_time_unavailable)
    nf_combined = calc_nf_combined(channel_nf, band_min_nf)
    ccif = round(CCIF(busy_ratio, nf_combined),7)
    print("ccif", ccif)
    print("expected", expected_result)
    assert ccif == expected_result



def test_calc_CCIFZ(expected_result, channel_nf):
    ccifz = round(CCIFZ(channel_nf),7)
    print("ccifz", ccifz)
    print("expected", expected_result)
    assert ccifz == expected_result


