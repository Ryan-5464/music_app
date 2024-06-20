from tests import *
from test_cases import *


test_calc_SCIF(
    test_case_1["expected_result"],
    test_case_1["busy_time"],
    test_case_1["rx_time"],
    test_case_1["active_time"],
    test_case_1["tx_time"],
    test_case_1["busy_time_unavailable"],
    test_case_1["channel_nf"],
    test_case_1["band_min_nf"],
)

test_calc_CCIF(
    test_case_1["expected_result"],
    test_case_1["busy_time"],
    test_case_1["rx_time"],
    test_case_1["active_time"],
    test_case_1["tx_time"],
    test_case_1["busy_time_unavailable"],
    test_case_1["channel_nf"],
    test_case_1["band_min_nf"],
)

test_calc_CCIFZ(
    test_case_1["expected_result_zero"],
    test_case_1["channel_nf"],
)


test_calc_SCIF(
    test_case_2["expected_result"],
    test_case_2["busy_time"],
    test_case_2["rx_time"],
    test_case_2["active_time"],
    test_case_2["tx_time"],
    test_case_2["busy_time_unavailable"],
    test_case_2["channel_nf"],
    test_case_2["band_min_nf"],
)

test_calc_CCIF(
    test_case_2["expected_result"],
    test_case_2["busy_time"],
    test_case_2["rx_time"],
    test_case_2["active_time"],
    test_case_2["tx_time"],
    test_case_2["busy_time_unavailable"],
    test_case_2["channel_nf"],
    test_case_2["band_min_nf"],
)

test_calc_CCIFZ(
    test_case_2["expected_result_zero"],
    test_case_2["channel_nf"],
)

