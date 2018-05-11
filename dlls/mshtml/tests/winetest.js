/*
 * Copyright 2016 Jacek Caban for CodeWeavers
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 */

function guard(f) {
    return function() {
        try {
            f();
        }catch(e) {
            ok(false, "Got exception " + ("message" in e ? e.message : e));
        }
    };
}

function next_test() {
    var test = tests.shift();
    window.setTimeout(guard(test), 0);
}

function run_tests() {
    tests.push(reportSuccess);
    next_test();
}

function ok(b,m) {
    return external.ok(b, m);
}

function trace(m) {
    external.trace(m);
}

function win_skip(m) {
    external.win_skip(m);
}

function reportSuccess() {
    external.reportSuccess();
}

var todo_wine = {
    ok: function(b,m) {
        return external.todo_wine_ok(b,m);
    }
};

function todo_wine_if(expr) {
    return expr ? todo_wine : { ok: ok };
}
